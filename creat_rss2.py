'''
creat_rss2.py 
Test on python3(windows 10)
Author: Labrusca
'''

import datetime
import os
import sys
import time
from rfeed import *

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

class BlogFeeds:
    def __init__(self):
        ''' Updata all markdown file into rss.xml '''
        # check if have new.md
        try:
            set_filename()
        except FileNotFoundError:
            print('No new.md file,pass...')
        self.items = []
        mdlist = os.listdir('./articles')
        for mdeach in mdlist:
            if mdeach != 'new.md':
                self.items.insert(0,self.get_info(mdeach))

        self.feed = Feed(
            title = "Light of Seraphim",
            link = "https://labrusca.net/rss.xml",
            description = "This is a blog of labrusca",
            language = "zh-CN",
            managingEditor = "labrusca@live.com",
            webMaster = "labrusca@live.com",
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
                fileinfo['description'] = ld.split('> ')[1][:-1]
            ld = fileobj.readline()
        fileobj.close()
        return Item(
                    title = fileinfo['title'],
                    link = f"https://labrusca.net/#/blog/{filedate[0]}/{filedate[1]}/{filedate[2]}/{filedate[3][:2]}{filedate[3][2:-3]}", 
                    categories = fileinfo['tags'], 
                    description = fileinfo['description'],
                    author = "labrusca@live.com",
                    guid = Guid(f"https://labrusca.net/articles/{filename}"),
                    pubDate = datetime.datetime(int(filedate[0]), int(filedate[1]), int(filedate[2]), int(filedate[3][:2]), int(filedate[3][2:-3])))

    def save_rss_file(self):
        f = open('rss.xml','w',encoding='utf-8')
        f.write(self.feed.rss())
        f.close()
        print('Rewrite: rss.xml\n')

if __name__ == "__main__":
    if len(sys.argv) == 2 :
        if sys.argv[1] == 'build':
            pub = BlogFeeds()
            #pub.show_rssxml()
            pub.save_rss_file()
        elif sys.argv[1] == 'new':
            creat_article()
    else:
        print('Nothing happened.')