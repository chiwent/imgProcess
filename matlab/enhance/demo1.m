I=imread('test.tif');
subplot(1,3,1);
imshow(I);title('Original');
subplot(1,3,2);
J=imadjust(I,[0.2 0.8],[0.3 0.9],1.1);
imshow(J);title('change1');
subplot(1,3,3);
K=imadjust(I,[0.3 0.7],[0.2 0.8],1.2);
imshow(K);title('change2');
imwrite(K,'test.jpg');