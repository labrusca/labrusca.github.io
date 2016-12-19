import os
import time
import json

def setfile():
    ''' Rename the file use datetime '''
    global filetime
    filetime = time.strftime("%Y-%m-%d-%H%M", time.localtime())
    os.rename('./articles/new.md','./articles/%s.md' % filetime)
    print('Renamed new.md to %s.md' % filetime)

def rebuildjson(dictinfo):
    ''' Add new data to data.json '''
    dictinfo['time'] = filetime
    f = open('data.json','r+')
    ogdata = json.load(f)['articles']
    ogdata.insert(0,dictinfo)
    newdata = {"articles": ogdata}
    f.seek(0)
    # Use json.dumps() to format JSON
    wdata = json.dumps(newdata,indent=2)  
    f.write(wdata)
    f.close()


def getinfo(f):
    ''' Get&delete infomation from file '''
    ld = f.readline()
    info = {"title": None,"tags": None}
    while not (info['title'] and info['tags']):
        if ld.startswith('[TITLE]:'):
            info['title'] = ld.split('[TITLE]')[1][1:-1]
        elif ld.startswith('[TAGS]:'):
            tagsstr = ld.split('[TAGS]')[1][1:-1]
            info['tags'] = tagsstr.split(',')
        ld = f.readline()
    return info

if __name__ == "__main__":
    try:
        tempfile = open('./articles/new.md','r')
    except IOError:
        print('Can\'t find the file new.md,please check!\n')
        exit(0)
    fileinfo = getinfo(tempfile)
    tempfile.close()
    setfile()
    rebuildjson(fileinfo)
    print('Rebuilt data.json at %s' % time.asctime(time.localtime()))