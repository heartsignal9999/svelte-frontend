// src/pages/blog-contents/1.ts
export const title: string = "심장음 세그멘테이션 모델 개발기";

export const content: string = `<p class='text leading-relaxed text-gray-400'>Establishing Measurement Model for Heart Sound Using Segmentation</p>
<p class='text-xl leading-relaxed text-gray-600'>[1부] <하트시그널> CV 세그멘테이션을 이용한 심장음 측정 모델</p>
<div class='text-right text-gray-500'>이동희, 이명준, 김정현
(KDT AIFFEL AI 리서치 6기)
</div>
<hr class="w-1/3 ml-0"><p class='text-gray-600 text-justify'>
여러분의 한 손에 테니스 공을 올려놓습니다. 그리고 1초마다 이 공을 꽉 쥐었다 펴는 운동을 해야 한다고 생각해보세요. 태어나서 죽을때까지 이 운동을 한다면? 당신은 평생 25억 번 공을 쥐었다 폈다 하게 됩니다.  

이것이 사람의 심장이 매초마다 쉼없이 하는 일입니다. 이 힘은 전속력으로 달릴 때 다리 근육이 쓰는 힘의 두배라고 합니다.<sup><a href="#footnote-1" id="ref-1">1</a></sup>  아무 것도 안 하고 ‘숨만 쉬어도’ 심장은 끊임없이 수축과 이완을 반복하면서 온몸에 피가 돌게 펌프질을 하고 있는 것이죠. 

‘모두의연구소’ AIFFEL 리서치 6기 수강생인 저희 세 사람은 쉬지 않고 뛰는 이 심장 박동을 처리하는 딥러닝 모델을 만들고 이 모델을 사용한 심장음 분석 서비스 하트시그널을 만들었습니다. 이어지는 글들은 이 프로젝트의 진행과 상세한 내용을 담고 있습니다. 

</p>
<h2 class="font-bold text-xl text-gray-700">프로젝트 출발: 우리가 심장소리에 꽂힌 이유는?</h2>
<p class='text leading-relaxed text-gray-600 text-justify'>6개월에 걸친 리서치 과정의 후반부 프로젝트를 앞두고, 6기 수강생들은 프로젝트로 진행할 자유주제 또는 기업과제를 선택하게 되었습니다. 그 중 헬스케어 전문기업 스마트사운드가 제안한 심장음 Segmentation과제가 있었습니다.
 
과제 내용은 공개된 심장소리 데이터셋을 활용해, 심장박동에 대한 이미지 세그멘테이션(Segmentation, 구분짓기)을 수행하고 그로부터 심장음을 찾아내는 모델을 만드는 것이었습니다.

이미지 세그멘테이션을 쉽게 말하면  사물의 외곽선 구분하기 입니다. 흔히 디자인에서 말하는 누끼(抜き) 따기와 비슷합니다.  이미지에서 특정한 객체(사람, 동물, 물건 등등)의 경계를 찾아서 다른 것과 구분되도록 표시하는 작업이죠.

그러니까 스마트사운드가 제안한 기업과제는 한마디로 ‘심장소리의 누끼를 딴다’는 것이었습니다. 그것은 호기심을 자극하는 동시에, 단번에 이해하기 어려운 혼란스러운(=상당히 어려워보이는) 설명이었습니다. 

저희 세 사람은 인공지능기술의 활용이 가장 시급하고 유망한 의료 및 헬스케어 분야에  관심을 갖고 있었습니다. 하지만 이 프로젝트를 함께 하게 된 더 근본적인 이유가 있습니다. 바로 세 사람 모두 소리와 관련된 개인 프로젝트를 구상하고 있었다는 거죠!

이렇게 공통 관심사가 있었던 저희 세 사람은소리와 의료 데이터 다뤄볼 수 있는 스마트사운드의 기업 프로젝트를 함께 하기로 결정 했습니다.
 
팀명은? (바이럴을 노리고) ‘하트시그널’이라고 짓고, 2개월에 걸친 여정이 시작되었습니다.

</p>
<h2 class="font-bold text-xl text-gray-700">과업 정의: 스펙트로그램(spectrogram) 세그멘테이션으로 심장 리듬의 시작과 끝 찾기</h2>
<p class='text leading-relaxed text-gray-600 text-justify'>심장 진찰에 쓰이는 가장 오래되고 기초적인 의료기기는 무엇일까요? 

그렇습니다. 청진기(聽診器, stethoscope)입니다. ‘의사 선생님’하면 딱 떠오르는 그 이미지를 대표하는 물건이기도 하죠.

누군가의 가슴팍에 귀를 대본 적이 있거나, 청진기 혹은 비슷한 도구로 심장소리를 들어보았다면 어떤 소리가 나는지 어렴풋이 알고 계실텐데요. 심장 청진으로 확실하게 알 수 있는 데이터는 크게 세 가지가 있습니다.
</p>
<div class="bg-gray-100 opacity-100 p-4"> <strong>1. 심장 리듬</strong>
보통 심장소리는 ‘쿵쾅(lub-dub), 쿵쾅’ 하고 뜁니다. 병이 있거나, 심장 특성이 일반적이지 않다면 다른 소리가 날 수 있습니다. 이때 수축기 심장음 ‘쿵’을 제1심음(The first heart sound, S1)이라고 하고 이완기 심음장 ‘쾅’을 제2심음(The second heart sound, S2)이라고 부릅니다.

<strong>2. 심박수</strong>
사람의 휴식기 심박수(resting heart rate)는 통상 1초에 1회, 분당 60회 정도입니다. 다소 빨라서 1분에 100회까지 뛰는 사람도 있고, 훈련량이 많은 운동선수들은 60회보다 낮은 경우도 있습니다. <sup><a href="#footnote-2" id="ref-2">2</a></sup>

<strong>3. 심박 규칙성(regularity)</strong>
심장박동이 규칙적인지 아닌지도 파악이 가능합니다. 심박 리듬(쿵쾅)과 속도는 계속 변화하지만, 별다른 외부 자극이나 심리 변화가 없는데도 리듬이나 심박수가 요동친다면 심질환을 의심할 수 있습니다.
</div>
<p class='text leading-relaxed text-gray-600 text-justify'>
하트시그널 팀이 스마트사운드로부터 요청받은 작업은, 녹음된 청진 데이터로부터 만들어낸 스펙트로그램(spectrogram)을 심장음에 해당하는 부분을 찾아 다른 소리와 구분하는 ‘세그멘테이션’ 작업입니다. 스펙트로그램이란 소리 데이터를 시간, 주파수, 신호 세기라는 세 축으로 나타낸 이미지 파일입니다. (이에 대해서는 3부에서 자세히 다룹니다) 그런데 심장음 처리와 분석을 위해 왜 이미지 세그멘테이션이라는 방법을 선택했을까요?

데이터 수준에서 이미지나 문자는 시간의 영향을 받지 않고 고정되어 있습니다. 소리 자료는 특정 시점의 데이터가 연결된 배열로, 시간 축을 반드시 갖게 됩니다. 데이터를 분석하고 처리해야 하는 연구자 입장에서는 오디오 파일을 조작하는 것이 이미지나 고정된 문자열보다 처리가 어렵습니다. 

그래서 오디오를 이미지 형태로 바꾸면 소리가 갖는 시간 정보 조작이 더 쉬워집니다.  데이터 크기도 줄어들어서 딥러닝 모델 개발에 필요한 컴퓨팅 자원도 적게 들고, 결과적으로 원하는 목표를 더 수월하게 달성할 수 있습니다. 그래서 오디오 데이터 딥러닝 분석은 이어서 설명할 컴퓨터 비전(Computer Vision, CV) 태스크로 변환하여 처리하는 것이 일반적입니다.

실제로 저희는 본격적인 프로젝트 시작에 앞서 관련 논문 및 모델을 살펴보았습니다. 일부 논문은 wav파일 같이 오디오 데이터 형식을 그대로 사용하기도 했지만, 대부분은 앞서 설명한 것처럼, 주파수 대역별로 정보를 분리할 수 있도록 오디오 파일로부터 이미지를 만들어서 CV작업으로 다루는 경우가 많았습니다.

</p>
<h2 class="font-bold text-xl text-gray-700">복습: 컴퓨터 비전의 주요 태스크들</h2>
<p class='text leading-relaxed text-gray-600 text-justify'>CV에 대해서 잘 아시는 분들은 물론, 다소 생소한 분들을 위해서 잠시 내용을 되짚어보겠습니다. 

CV란 쉽게 말해 ‘눈 달린 컴퓨터’입니다. 물론 컴퓨터는 생명체가 아니기 때문에 (최근에는 이 명제도 사실이 아니어가고 있는 것처럼 보이지만) 눈이 달려있지는 않죠. 그래서 다시 정의하면 컴퓨터 비전이란, 카메라 같은 광학 장치를 통해 읽어들인 데이터(이미지)에 대해서 마치 사람이 눈으로 물체를 인식하고 분별하는 것처럼 특정한 작업을 알아서 수행하는 인공지능 및 그 과업이라고 할 수 있습니다. 

이 가운데 이미지 세그멘테이션은 CV를 이용한 대표적인 인공지능 작업(AI tasks) 가운데 하나입니다. 

대표적인 CV 작업으로는 아래와 같이 3가지가 있으며<sup><a href="#footnote-3" id="ref-3">3, </a></sup><sup><a href="#footnote-4" id="ref-4">4</a></sup>, 이 외에도 이미지 유사도 평가, 키포인트 감지, 포즈 추정, 3D 메시 추정 등이 있습니다.
</p>
<div class="bg-gray-100 opacity-100 p-4"><strong>1. 이미지 분류(Image classification)</strong>
이미지에 하나 이상의 레이블을 할당, 단일 레이블이거나 다중 레이블인 경우 존재
<img src="/img/blog/1/1_1.jpg" alt="Dogs catching wooden sticks"  class="rounded  p-4">	
<pre class="bg-gray-900 text-white rounded p-3 whitespace-pre-wrap">
<code># 단일 레이블 분류
  : 강아지 입니다.

# 다중 레이블 분류
  : 강아지, 나무 막대기, 땅, 하늘입니다.</code></pre></div>
<div class="bg-gray-100 opacity-100 p-4"><strong>2. 이미지 세그멘테이션(Image segmentation)</strong>
이미지를 다른 영역으로 나누거나 분할하는 것이 목표, 각 영역은 일반적으로 하나의 범주를 나타냄
<img src="/img/blog/1/1_2.jpg" alt="Dogs catching wooden sticks"  class="rounded p-4">	
<pre class="bg-gray-900 text-white rounded p-3 whitespace-pre-wrap">
<code># 이미지에서 각 범주의 외곽선을 픽셀 수준에서 분리한 후 일반적으로 이미지 분류 또한 진행합니다.</code></pre></div></div>
<div class="bg-gray-100 opacity-100 p-4"><strong>3. 객체 탐지(Object detection)</strong>
이미지에 있는 관심 있는 객체 주변에 [바운딩 박스]를 그리는 것이 목표, 각 사각형은 하나의 클래스에 연관됨. 예를 들면 자율 주행 자동차는 객체 탐지 모델을 사용해서 카메라 화면에서 자동차, 보행자, 표지판 등을 감지함
	
<img src="/img/blog/1/1_3.jpg" alt="Dogs catching wooden sticks"  class="rounded  p-4">	
<pre class="bg-gray-900 text-white rounded p-3 whitespace-pre-wrap">
<code># 특정 범주에 해당하는 물체에 대해 바운딩 박스를 그린 후,  물체의 범주를 분류합니다.</code></pre></div>
</div>
<p class='text leading-relaxed text-gray-600 text-justify'>
이 중 세그멘테이션은 컴퓨터비전의 여러 작업 가운데서도 특히 모델 개발 과정에 성능 좋은 GPU가 요구되는 고수준 작업입니다. 경계 상자(bounding boxes)로 사진에서 특정한 대상의 위치를 탐지하는 객체 탐지(object detection) 작업에서 더 나아가, 다른 대상과의 정확한 구분선을 찾아내는 것이 바로 세그멘테이션 작업인데요.

바운딩박스를 이용한 객체 탐지는 아이펠 4기와 5기가 이미 수행한 바 있고, 이를 좀 더 발전시켜 세그멘테이션 모델을 적용해 결과를 살펴보자는 것이 스마트사운드의 기업과제 수행목표였습니다.
더불어 세그멘테이션으로 추출된 심장음 이미지가 그리는 모양이 다른 소음들의 모양과 비교했을 때, 특징적인 형태를 나타낼 것이라는 가정을 했고, 그로 인해 세그멘테이션 모델이 좀 더 정확하게 심장음을 분석해낼 수 있지 않을까 가정했습니다.. 그래서 4기와 5기가 했던 객체 탐지 모델보다는 저희가 설정한 평가지표에서 더 좋은 결과를 얻을 수 있다고 가정했습니다.세그멘테이션 모델을 이용해 청진기로 기록한 심장음 ‘쿵-쾅’(‘lub-dub’) 소리의 시작과 종료시간을 정확하게 포착할 수 있다면 분당 심박수와 심박 규칙성도 저절로 알아낼 수 있습니다. 

심장음의 시작 및 종료 시간으로 어떻게 심박수와 규칙성을 알 수 있을까요? 분당 심박수는 가로축 전체 시간으로부터 파악된 심박 숫자를 나누면 됩니다. 또 심박 규칙성은, 녹음된 전체 길이에서 각 심박의 지속 시간에 대한 평균과 분산으로 표현할 수 있습니다.
 
</p>
<h2 class="font-bold text-xl text-gray-700">아날로그 심장소리 분석의 어려움은?</h2>
<p class='text leading-relaxed text-gray-600 text-justify'>그렇다면 어떤 문제 때문에 직접 딥러닝 모델을 만들 필요성이 생겼을까요? 

심장을 포함한 심혈관질환은 전세계 1위 사망원인로 꼽히는데요, 오늘날에는 의료기관이 기기로 심장 청진음(줄여서 ‘심음’)을 기록하고 관련 정보를 정량적으로 수집합니다. 

의료 기기 없이 청진음만으로 심장 리듬과 심박수 및 그 규칙적인 정도를 수치화하는 것은 꽤 까다로운 작업입니다. 예컨대 사람이 초시계로 직접 분당 심박수를 재야 한다면? 또는 제 1심음 내지 제 2심음을 구분하거나 그 사이에 존재하는 어떤 잡음을 걸러내는 것은 너무 번거롭거나 어려운 일이겠죠.

하트시그널 프로젝트는 바로 이 작업을 수행하는 딥러닝 모델을 만드는 것을 목표로 출발했습니다.

의료 기기가 없는 진료 환경에서, 혹은 병원 바깥에서 심질환 환자가 스스로 심장음 기록을 남기고, 진료가 필요한 경우를 딥러닝 모델로 판단할 수 있도록 하기 위해서입니다. 

심장음 정보로부터 질환의 유무나 병증의 진행 정도를 판별하는 것은 지식과 경험을 갖춘 전문 의료진의 영역입니다. 한편, 딥러닝 모델을 이용해 심질환 환자가 일상 생활중에 심장소리를 녹음하고 심박수와 같은 정량 데이터를 기록하는 것은 의료진과 환자 본인에게  유용한 정보가 됩니다. 

이제 이어지는 2부에서는 본격적인 모델 구축에 앞서, 데이터셋을 분석하고 처리한 과정을 살펴보겠습니다.

</p>
<div class="text-right">(계속...)</div>

<footer class="text-gray-500">
<hr class="w-1/3 ml-0">
<p class='text-lg leading-relaxed'>참고자료</p>
  <p><sup id="footnote-1">1 </sup><a href="https://www.pbs.org/wgbh/nova/heart/heartfacts.html" target="_blank" class="text-blue-500 hover:text-blue-700">PBS Online, “Amazing Heart Facts”</a> <a href="#ref-1">↩</a>
  <p><sup id="footnote-2">2 </sup><a href="https://ko.wikipedia.org/wiki/%EC%8B%AC%EB%B0%95%EC%88%98" target="_blank" class="text-blue-500 hover:text-blue-700"> - 위키백과, 우리 모두의 백과사전 - 심박수</a><a href="#ref-2">↩</a>
  <p><sup id="footnote-3">3 </sup>프랑소와 숄레, <a href="https://www.gilbut.co.kr/book/view?bookcode=BN003496" target="_blank" class="text-blue-500 hover:text-blue-700">케라스 창시자에게 배우는 딥러닝</a>(길벗, 2022) 328쪽<a href="#ref-3">↩</a>
  <p><sup id="footnote-4">4 </sup>SUPERB AI 블로그, <a href="https://blog-ko.superb-ai.com/object-tracking-technology-for-video-analysis/" target="_blank" class="text-blue-500 hover:text-blue-700">동영상 분석을 위한 객체 추적 기술</a> <a href="#ref-4">↩</a></p>
</footer>
`;
