import json

__name__ = "feedjson"
__version__ = (0, 1, 0)
__author__ = "Labrusca - https://labrusca.net"

class ElementRequiredError(Exception):
    def __doc__(self):
        return "created by https://github.com/svpino"

    def __init__(self, element1, element2=None):
        self.element1 = element1
        self.element2 = element2

    def __str__(self):
        if self.element2 is not None:
            return 'Either "' + self.element1 + '" or "' + self.element2 + '" must be defined'

        return '"' + self.element1 + '" must be defined'


class Feedjson():
    def __init__(self, title=None, home_page_url=None, description=None, feed_url=None, author="", items=[]):
        self._version = "https://jsonfeed.org/version/1"
        self.title = title
        self.home_page_url = home_page_url
        self.description = description
        self.feed_url = feed_url
        self.author = {"name": author} 
        self.items = items


    def rss(self):
        self.data = {"version": self._version, 
                     "title": self.title, 
                     "home_page_url": self.home_page_url, 
                     "description": self.description, 
                     "feed_url": self.feed_url, 
                     "author": self.author,
                     "items": self.items
                     }
        return json.dumps(self.data)

    def add_item(self, i):
        if i is None:
            raise ElementRequiredError("item")
        self.data["items"].insert(0, i)
        return True


class Item():
    def __init__(self, id=None, title=None, url=None, date_published=None, author=None, tags=[], summary=None, content_text=None):
        self.data = {
            "id": id, 
            "title": title, 
            "url": url, 
            "author": author, 
            "summary": summary, 
            "content_text": content_text, 
            "tags": tags, 
            "date_published": date_published
        }