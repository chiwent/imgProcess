input = imread('IMG_20180329_184849.jpg');
output1 = rgb2gray(input);
output2 = histeq(output1,256);

subplot(131);
imshow(input);
title('Original');

subplot(132);
imshow(output1);
title('output1');

subplot(133);
imshow(output2);
title('output2');
imwrite(output2,'output.jpg');
figure;
imhist(output1);
figure;
imhist(output2);