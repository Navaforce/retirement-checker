import math
from PIL import Image, ImageDraw, ImageFilter
S=2048
G=(57,255,136); BG=(7,11,8)
img=Image.new('RGB',(S,S),BG)
d=ImageDraw.Draw(img)
step=S//16
for i in range(0,S+1,step):
    d.line([(i,0),(i,S)],fill=(14,28,18),width=4); d.line([(0,i),(S,i)],fill=(14,28,18),width=4)
c=S//2; R=int(S*0.40)
glow=Image.new('RGB',(S,S),(0,0,0)); g=ImageDraw.Draw(glow)
for r,w in ((R,26),(int(R*.66),14),(int(R*.33),14)):
    g.ellipse([c-r,c-r,c+r,c+r],outline=G,width=w)
g.line([(c-R,c),(c+R,c)],fill=G,width=10); g.line([(c,c-R),(c,c+R)],fill=G,width=10)
sweep=Image.new('RGBA',(S,S),(0,0,0,0)); sd=ImageDraw.Draw(sweep)
for k in range(60):
    a0=-70-k*1.0; a1=a0+1.2
    sd.pieslice([c-R,c-R,c+R,c+R],a0,a1,fill=(57,255,136,int(150*(1-k/60)**1.6)))
sd.line([(c,c),(c+R*math.cos(math.radians(-70)),c+R*math.sin(math.radians(-70)))],fill=(57,255,136,255),width=16)
glow=glow.filter(ImageFilter.GaussianBlur(14))
img=Image.blend(img,Image.eval(glow,lambda v:v),0) 
img=Image.composite(img,img,Image.new('L',(S,S),255))
from PIL import ImageChops
img=ImageChops.add(img,glow)
d=ImageDraw.Draw(img)
for r,w in ((R,12),(int(R*.66),6),(int(R*.33),6)):
    d.ellipse([c-r,c-r,c+r,c+r],outline=G,width=w)
d.line([(c-R,c),(c+R,c)],fill=(30,120,70),width=4); d.line([(c,c-R),(c,c+R)],fill=(30,120,70),width=4)
img=img.convert('RGBA'); img.alpha_composite(sweep); d=ImageDraw.Draw(img)
sw=int(S*.15); sh=int(S*.36); top=c-sh//2-10
shield=[(c-sw,top),(c,top-int(sh*.06)),(c+sw,top),(c+sw,top+int(sh*.55)),(c,top+sh),(c-sw,top+int(sh*.55))]
d.polygon(shield,fill=(7,11,8,255),outline=G,width=18)
kr=int(sw*.28); ky=top+int(sh*.36)
d.ellipse([c-kr,ky-kr,c+kr,ky+kr],fill=G)
d.polygon([(c-kr*.55,ky+kr*.4),(c+kr*.55,ky+kr*.4),(c+kr*.9,ky+sh*.26),(c-kr*.9,ky+sh*.26)],fill=G)
bl=int(S*.12); m=int(S*.05); w=22
for sx,sy in ((m,m),(S-m,m),(m,S-m),(S-m,S-m)):
    dx=1 if sx<c else -1; dy=1 if sy<c else -1
    d.line([(sx,sy),(sx+dx*bl,sy)],fill=G,width=w); d.line([(sx,sy),(sx,sy+dy*bl)],fill=G,width=w)
for sz,name in ((180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')):
    img.convert('RGB').resize((sz,sz),Image.LANCZOS).save(name)
