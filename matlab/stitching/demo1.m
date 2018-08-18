img01 = imread('1.jpg');
img02 = imread('2.jpg');

subplot(1,2,1);
imshow(img01);
title('origin-1');
subplot(1,2,2);
imshow(img02);
title('origin-2');

img01=rgb2gray(img01);
img02=rgb2gray(img02);

[row1,col1] = size(img01);
[row2,col2] = size(img02);


img1 =  img01;
img2 =  img02;

row = max(row1,row2);
col = max(col1,col2);
img=zeros(row,col);

% 以下的x和y大小依据图片大小确定
img(1:row2,1:col2,:) = img2; %拼接图像
for x=501:1:1440 
    for y=601:1:1080
    img(x,y) = img1(x-300,y-400);
    end
end
final = uint8(img);
figure;
imshow(final),title('final-1');
imwrite(final,'final-1.jpg');

img(1:row2,1:col2,:) = img2; %拼接图像
for x=601:1:1440 
    for y=701:1:1080
    img(x,y) = img1(x-300,y-400);
    end
end

final = uint8(img);
figure;
imshow(final),title('final-2');
imwrite(final,'final-2.jpg');
