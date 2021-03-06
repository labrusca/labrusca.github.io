'''
creat_feedjson.py 
Test on python3(windows 10)
Author: Labrusca
'''

import base64
import datetime
import os
import sys
import time
import feedjson
import rfeed

def set_filename():
    ''' Rename the file use datetime '''
    global filetime
    filetime = time.strftime("%Y-%m-%d-%H%M")
    os.rename('./articles/new.md','./articles/%s.md' % filetime)
    print('Renamed new.md as %s.md' % filetime)

def creat_article():
    with open('./articles/new.md','w') as new:
        new.write('[TITLE]:\n')
        new.write('[TAGS]:\n\n')
        new.write('> This is description.\n\n')
    print("The file: new.md has been Created!")


def b64_encoder(string):
    byte_obj=string.encode("utf-8")#string to bytes.
    encoded=base64.b64encode(byte_obj)#arg is must be bytes.
    return encoded.decode("utf-8")

class BlogFeeds:
    def __init__(self):
        ''' Updata all markdown file into rss.xml '''
        # check if have new.md
        try:
            set_filename()
        except FileNotFoundError:
            print('No new.md file,pass...')
        self.feedjson_items,  self.rss2_items= [], []
        mdlist = os.listdir('./articles')
        for mdeach in mdlist:
            if mdeach != 'new.md':
                ijson_info, rjson_info = self.get_info(mdeach)
                self.feedjson_items.insert(0,ijson_info)
                self.rss2_items.insert(0,rjson_info)

        self.feed = feedjson.Feedjson(
            title = "Light of Seraphim",
            feed_url = "https://labrusca.net/feed.json",
            description = "This is a blog of labrusca",
            author = "labrusca#live.com (Labrusca)",
            home_page_url = "https://labrusca.net/",
            items = self.feedjson_items)

        self.rss2 = rfeed.Feed(
            title = "Light of Seraphim",
            link = "https://labrusca.net/rss.xml",
            description = "This is a blog of labrusca",
            language = "zh-CN",
            managingEditor = "labrusca@live.com (Labrusca)",
            webMaster = "labrusca@live.com (Labrusca)",
            lastBuildDate = datetime.datetime.now(),
            items = self.rss2_items)

    def show_feed(self):
        print(self.feed.rss())

    def get_info(self,filename):
        ''' Get infomation from file '''
        filedate = filename.split('-')
        fileinfo = {"title": None,"tags": None,"description": None}
        fileobj = open(f"articles/{filename}",'r', encoding='utf-8')
        ld = fileobj.readline()
        while not (fileinfo['title'] and fileinfo['tags'] and fileinfo['description']):
            if ld.startswith('[TITLE]:'):
                fileinfo['title'] = ld.split('[TITLE]')[1][1:-1]
            elif ld.startswith('[TAGS]:'):
                tagsstr = ld.split('[TAGS]')[1][1:-1]
                fileinfo['tags'] = tagsstr.split(',')
            elif ld.startswith('> '):
                fileinfo['description'] = ld.split('> ')[1][:-1]
            ld = fileobj.readline()
        b64_id = b64_encoder(f"https://labrusca.net/articles/{filename}")
        fileobj.close()
        return feedjson.Item(
                    title = fileinfo['title'],
                    url = f"https://labrusca.net/blog/#/{b64_id}", 
                    tags = fileinfo['tags'], 
                    content_text = fileinfo['description'],
                    author = "Labrusca",
                    id = b64_id,
                    date_published = datetime.datetime(int(filedate[0]), int(filedate[1]), int(filedate[2]), int(filedate[3][:2]), int(filedate[3][2:-3])).isoformat('T')
                    ).data, \
                rfeed.Item(
                    title = fileinfo['title'],
                    link = f"https://labrusca.net/blog/#/{b64_id}", 
                    categories = fileinfo['tags'], 
                    description = fileinfo['description'],
                    author = "labrusca@live.com (Labrusca)",
                    guid = rfeed.Guid(b64_id),
                    pubDate = datetime.datetime(int(filedate[0]), int(filedate[1]), int(filedate[2]), int(filedate[3][:2]), int(filedate[3][2:-3])))

    def save_feed_file(self):
        f = open('feed.json','w',encoding='utf-8')
        f.write(self.feed.rss())
        f.close()
        print('Writing -> feed.json\n')

    def save_rss2_file(self):
        f = open('rss.xml','w',encoding='utf-8')
        f.write(self.rss2.rss())
        f.close()
        print('Writing -> rss.xml\n')

if __name__ == "__main__":
    if len(sys.argv) == 2 :
        if sys.argv[1] == 'build':
            pub = BlogFeeds()
            #pub.show_rssxml()
            pub.save_feed_file()
            pub.save_rss2_file()
        elif sys.argv[1] == 'new':
            creat_article()
    else:
        print('Nothing happened.')