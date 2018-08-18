pic = imread('gakki.png');
subplot(341);
imshow(pic);
%imwrite('gakki1.jpg');
title('original');

grayPic = rgb2gray(pic);
subplot(342);
imshow(grayPic);
imwrite(grayPic,'灰度图.jpg');
title('Grayscale map');

gaussPic = imnoise(grayPic,'gaussian',0.03);
subplot(343);
imshow(gaussPic);
imwrite(gaussPic,'高斯噪声.jpg');
title('Gaussian map');


spPic = imnoise(grayPic,'salt & pepper',0.03);
subplot(344);
imshow(spPic);
imwrite(spPic,'椒盐噪声.jpg');
title('salt&pepper');


gaus = fspecial('gaussian',[5 5]);

gauPic = imfilter(gaussPic,gaus,'conv');
subplot(345);
imshow(gauPic);
imwrite(gauPic,'高斯噪声&高斯滤波.jpg');
title({['gaussian'];['gaussian filter']});



sPic = imfilter(spPic,gaus,'conv');
subplot(346);
imshow(sPic);
imwrite(sPic,'高斯滤波和椒盐噪声.jpg');
title({['salt&pepper'];['gaussian filter']});

midgau = medfilt2(gaussPic);
subplot(347);
imshow(midgau);
imwrite(midgau,'中值滤波和高斯噪声.jpg');
title('median filter1');

midsp = medfilt2(spPic);
subplot(348);
imshow(midsp);
imwrite(midsp,'中值滤波和椒盐噪声.jpg');
title('median filter2');



[h,w] = size(grayPic);
oMad = (h*w);

a = abs(gaussPic - grayPic);
%a = mean(a(:));
a = sum(a(:));
a = a/(h*w);
fprintf('加高斯噪声Mad = %.3f\n',a);

b = abs(spPic-grayPic);
%b = mean(b(:));
b = sum(b(:));
b = b/oMad;
fprintf('加椒盐噪声Mad = %.3f\n',b);

c = abs(gauPic-grayPic);
%c = mean(c(:));
c = sum(c(:));
c = c/oMad;
fprintf('高斯滤波处理高斯噪声Mad = %.3f\n',c);

d = abs(sPic-grayPic);
%d = mean(d(:));
d = sum(d(:));
d = d/oMad;
fprintf('高斯滤波处理椒盐噪声Mad = %.3f\n',d);

e = abs(midgau-grayPic);
%e = mean(e(:));
e = sum(e(:));
e = e/oMad;
fprintf('中值滤波处理高斯噪声Mad = %.3f\n',e);

f = abs(midsp - grayPic);
%f = mean(f(:));
f = sum(f(:));
f = f/oMad;
fprintf('中值滤波处理椒盐噪声pMad = %.3f\n',f);





