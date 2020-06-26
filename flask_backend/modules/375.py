import requests
from bs4 import BeautifulSoup
from bs4 import SoupStrainer
from multiprocessing import Pool
import json

class webScraper:

    def __init__(self, url):
        self.url = url
        self.items = []
        # Soup Strainers
        self.only_li_tags = SoupStrainer("li")
        self.only_a_tags = SoupStrainer("a")
        self.only_h1_tags = SoupStrainer("h1")
        self.only_img_tags = SoupStrainer("img")
        
    def scrape(self):
        # set page number boundaries
        min_page_num = 1
        max_page_num = 1#self.get_max_page_num()
        # multithreader
        p = Pool()
        res = p.map(self.fetch_items, range(min_page_num, max_page_num + 1))
        p.terminate()
        p.join()
        # flatten list
        self.items = [a for b in res for a in b]
    
    def get_max_page_num(self):
        src = requests.get(self.url).content
        soup = BeautifulSoup(src, 'lxml', parse_only=self.only_li_tags)
        page_text = soup.find(attrs={"class": "pagination__text"}).text
        return int(page_text.strip().split(" ")[-1])
    
    def fetch_items(self, page_num):
        page_url = self.url + "?page=" + str(page_num)
        response = requests.get(page_url)
        # Check that the page is accessable
        if response.status_code != 200:
            return
        # Get page source
        src = response.content
        soup = BeautifulSoup(src, 'lxml', parse_only=self.only_a_tags)
        # items' data
        items = []
        # Get all elements that hold name,vencor,price
        for a_tag in soup.find_all(attrs={"class": "grid-view-item__link grid-view-item__image-container", "title":not None}):
            item = {}
            # url to the item's page
            item_url = self.url + a_tag.attrs["href"]
            # src code of item's page
            item_src = requests.get(item_url).content
            # name of item
            item_name = self.get_item_name(item_src)
            # vendor of item
            item_vendor = a_tag.find("div", attrs={"class": "grid-view-item__vendor"}).text
            # lowest listed price of item
            item_price = self.get_item_price(a_tag.find("div", attrs={"class": "grid-view-item__meta"}))
            # images of item
            item_images = self.get_item_images(item_src)
            # add data to item
            item["item_name"] = item_name
            item["item_vendor"] = item_vendor
            item["item_price"] = item_price
            item["item_images"] = item_images
            item["item_url"] = item_url
            # add item data to items
            items.append(item)
        return items 
    
    def get_item_name(self, item_src):
        soup = BeautifulSoup(item_src, 'lxml', parse_only=self.only_h1_tags)
        h1_tag = soup.find(attrs={"class": "product-single__title heading"})
        return h1_tag.text
            
    def get_item_price(self, div):
        regular_price = div.find(attrs={"class": "product-price__price"})
        sale_price = div.find(attrs={"class": "product-price__price product-price__sale"})
        lowest_price = sale_price.text if sale_price is not None else regular_price.text
        return lowest_price.strip()
    
    def get_item_images(self, item_src):
        soup = BeautifulSoup(item_src, 'lxml', parse_only=self.only_img_tags)
        img_tags = soup.findAll(attrs={"class": "product-single__thumbnail-image medium-up--hide"})
        images = []
        for img_tag in img_tags:\
            images.append(img_tag["src"])
        return images


if __name__ == '__main__':
    ws_men = webScraper("https://shop375.com/collections/gender-mens")
    ws_men.scrape()
    items_men = ws_men.items
    items_men_json = json.dumps(items_men)
    
    #ws_women = webScraper("https://shop375.com/collections/gender-womens")
    #ws_women.scrape()
    #items_women = ws_women.items
    