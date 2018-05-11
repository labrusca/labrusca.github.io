'''
manage.py 
Test on python3(windows 10)
Author: Labrusca
'''

import datetime
import os
import time
from rfeed import *

def setfilename():
    ''' Rename the file use datetime '''
    global filetime
    filetime = time.strftime("%Y-%m-%d-%H-%M")
    os.rename('./articles/new.md','./articles/%s.md' % filetime)
    print('Renamed new.md to %s.md' % filetime)


class BlogFeeds:
    def __init__(self):
        ''' Updata all markdown file into rss.xml '''
        # check if have new.md
        try:
            setfilename()
        except FileNotFoundError:
            pass
        self.items = []
        mdlist = os.listdir('./articles')
        for mdeach in mdlist:
            self.items.append(self.get_info(mdeach))

        self.feed = Feed(
            title = "Light of Seraphim",
            link = "https://labrusca.net/rss.xml",
            description = "This is a blog of labrusca",
            language = "zh-CN",
            lastBuildDate = datetime.datetime.now(),
            items = self.items)

    def show_rssxml(self):
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
                fileinfo['description'] = ld.split('> ')[1][1:-1]
            ld = fileobj.readline()
        fileobj.close()
        return Item(
                    title = fileinfo['title'],
                    link = f"https://labrusca.net/{filedate[0]}/{filedate[1]}/{filedate[2]}/{filedate[3]}{filedate[4][:-3]}", 
                    #tags = fileinfo['tags'], 
                    description = fileinfo['description'],
                    author = "Labrusca",
                    guid = Guid(f"https://labrusca.net/articles/{filename}"),
                    pubDate = datetime.datetime(int(filedate[0]), int(filedate[1]), int(filedate[2]), int(filedate[3]), int(filedate[4][:-3])))

    def save_rss_file(self):
        f = open('rss.xml','w',encoding='utf-8')
        f.write(self.feed.rss())
        f.close()

if __name__ == "__main__":
    pub = BlogFeeds()
    #pub.show_rssxml()
    pub.save_rss_file()