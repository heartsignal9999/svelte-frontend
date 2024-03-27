// src/pages/blog-contents/2.ts
export const title: string = "딥러닝 모델 구성 전 탐색적 데이터셋 분석";

export const content: string = `<p class='text leading-relaxed text-gray-400'>Exploratory Analyzing The CirCor DigiScope Dataset Before Building a Deep Learning Model</p>
<p class='text-lg leading-relaxed text-gray-600'>[2부] <하트시그널> CV 세그멘테이션을 이용한 심장음 측정 모델</p>
<div class='text-right text-gray-500'>이동희, 이명준, 김정현
(KDT AIFFEL AI 리서치 6기)
</div>
<p class='text leading-relaxed text-gray-600 text-justify'>
심장소리를 시각화해서 분석한다는 프로젝트 개요를 지난 포스트에서 살펴보았습니다. 그렇다면 '소리'를 어떻게 하면 '눈으로 볼 수' 있을까요? 저희는 프로젝트를 진행하기 전에 우선 관련된 논문을 찾는 과정을 거쳤습니다. 심음에 대해서 최대한 다양한 방식으로 분석한 논문, 노이즈 제거에 대한 논문, 트랜스 포머 모델 등 다양한 모델을 적용한 논문, 심음이 아닌 폐음 등 비슷하지만 약간 다른 소리에 대한 분석 논문 등을 찾아보았는데요.

저희는 컴퓨터 비전(CV)을 배웠고, 이미지를 사용하는 딥러닝 모델에 관심이 있었습니다. 프로젝트 진행기 1부에서 소리를 이미지로 나타내는 ‘스펙트로그램’에 대해서 이야기했는데요, . 스펙트로그램은 여러 신호로 구성된 정보를 각 신호로 나눠 표시하는 방법인 스펙트럼(spectrum)과 도표/시각자료를 나타내는 접미사(-gram)의 합성어입니다. 통상 스펙트로그램이라고 하면 음성 데이터를 시각화한 결과 이미지를 가리킵니다.

스펙트로그램 이미지는 소리, 더 넓게는 파동(wave) 데이터를 3차원으로 표시합니다. 이때 이미지의 가로 축은 시간, 세로 축은 주파수 그리고 색깔은 해당 시점에서 주파수의 강도(intensity)를 가리키는데요, 색깔이 진해질 수록 음의 세기가 커진다고 생각하시면 됩니다.

스펙트로그램의 구조는 흔히 보는 등고선과 거의 동일합니다. 차이가 있다면 등고선의 경우는 ‘해발’을 기준으로 지형 고도 값이 음수(해저)와 양수(지표)를 갖지만, 저희가 사용한 라이브러리로 처리된 스펙트로그램은 동일한 소리 데이터셋에서 가장 강도가 센 부분을 0으로 하고 나머지는 상대적인 음수값을 갖도록 표시했다는 점입니다.

이러한 상대 강도 표시 방법은, 절대값보다는 상대적인 크기를 가지고 소리의 특성을 발견하는 일반적인 접근법을 따른 결과입니다. 소리 데이터가 녹음되는 상황은 기기나 주변 소음에 따라 저마다 달라서, 여러 소리들이 뒤섞인 데이터에서 상대값으로 강도를 표현하는 것이 각 소리의 특성을 파악하는 데에 더 용이하기 때문입니다.

</p>
<h2 class="font-bold text-xl text-gray-700">모델 훈련 데이터셋 소개: 서코 디지스코프 데이터셋
</h2>

<p class='text leading-relaxed text-gray-600 text-justify'>
이제 심장음으로부터 심장 박동을 포착하는 모델을 만들기 위해 사용한 데이터를 살펴보겠습니다(Exploratory Data Analysis, 데이터의 탐색적 분석). 과제를 제안한 스마트사운드는 여러 사업과 정부 과제를 수행하면서 자체적으로 심장음을 수집해오고 있습니다. 하지만 의료법과 개인정보 보호법 위반 소지가 있어 기업 측으로부터 데이터를 제공받을 수는 없습니다. 

대신 스마트사운드 과제 소개 단계에서도 제안되었던 ‘서코 디지스코프 음향심전도 데이터셋(The CirCor DigiScope Dataset, 이하 ‘서코 데이터’)’을 모델 훈련에 사용하기로 했습니다. 

‘서코 데이터’는 현존하는 가장 방대한 소아 심장음 공개 데이터입니다. 이 데이터는 2014년과 2015년에 브라질 북동부 페르남부쿠 주(Estado do Pernambuco)에서 두 차례에 걸쳐 실시된 대규모 검진을 통해 수집된, 21세 미만의 소아 및 청소년 1568명(평균 연령 약 만 6세, 월령 73.4월) 의 청진 기록입니다.

‘서코 데이터’는 미국 생체의학 연구기관인 피지오넷의 2022년 공개 학술경연대회(Heart Murmur Detection from Phonocardiogram Recordings: The George B. Moody PhysioNet Challenge 2022<sup><a href="#footnote-1" id="ref-1">1</a></sup>, 이하 ‘피지오넷 2022 챌린지’)를 위해 가공된 것입니다. 1999년 설립된 미국의 생체의학 연구기관인 피지오넷은 연구목적으로 수집된 다양한 공개 의료 데이터로 유명합니다. <sup><a href="#footnote-1" id="ref-1">1</a></sup> 

‘피지오넷 2022 챌린지’는 심장잡음을 탐지하는 알고리즘을 공모했는데요. 의료 환경이 열악한 지역에서 소아의 심장을 비침습적(non-invasive)으로, 즉 바늘이나 칼을 사용하지 않고 심장질환의 징후 중 하나인 ‘심잡음(heart murmur)’ 여부를 판별하는 모델을 만드는 것이 목표였습니다. 2016년에는 동일한 데이터로 심장음의 임상적인 정상/비정상 여부를 판별하는 챌린지가 진행된 바 있습니다. <sup><a href="#footnote-2" id="ref-2">2</a></sup>

데이터셋은 훈련, 검증, 테스트 세트로 구성되어 있으며, 각각의 세트는 심장 잡음 관련 레이블과 임상 결과 레이블을 포함하고 있습니다. 실제 수집된 데이터는 5,282개라고 알려져 있지만, 이 중 공개된 것은 테스트 셋과 검증 셋을 제외한 약 3천여개입니다. 
</p>
<h2 class="font-bold text-xl text-gray-700">실제 데이터셋 파일의 세부 구성</h2>

<p class='text leading-relaxed text-gray-600 text-justify'>
데이터셋은 wav, hea, tsv, txt 모두 네 가지 종류의 확장자 파일로 구성되어 있습니다. 각 파일별 특성을 자세히 살펴보겠습니다. 

<strong>1. 웨이브(.wav) 파일</strong>
먼저 wav 파일을 살펴보면, 디지털 청진기로 녹음하여 2000헤르츠로 처리된 심음 녹음 파일들입니다. 동일한 환자의 심장음이 여러개 녹음된 경우도 있는데, 아래 그림의 네 심장 판막(valve, 피가 역류하지 않고 한쪽방향으로 잘 흐르도록 도와주는 부분<sup><a href="#footnote-4" id="ref-4">4</a></sup>) 부근 흉부를 여러 번 청진한 경우입니다. 모든 녹음파일은 청진한 판막 위치 기호가 ‘85349_AC.wav’와 같이 청진한 판막 위치가 파일 이름에 표시되어 있습니다.

소리를 직접 들어보면 심장박동 소리 같은 게 들리기도 하고, 잡음이나 사람 소리 같은 게 멀리서 들리는 것처럼 섞여 있습니다. 잘 갖춰진 환경에서 기계를 이용해 청진한 것이 아니라 사람이 직접 청진기를 이용해 수집한 데이터다보니, 심장 소리 이외에 다른 소리들이 섞여 있다는 것을 알 수 있습니다.

<strong>2. 헤더(.hea) 파일</strong>
hea 파일은 녹음된 wav 파일의 메타 정보를 담고 있습니다. 녹음 파일을 처리하는 데에 있어 연구 프로젝트를 위해 피지오넷이 자체적으로 개발한 파형 데이터베이스 소프트웨어 패키지가 사용되었으며<sup><a href="#footnote-3" id="ref-3">3</a></sup>, 이 패키지에 의해 만들어진 데이터 처리 정보가 아래와 같이 담겨 있습니다.

<pre class="bg-gray-900 text-white rounded p-3 whitespace-pre-wrap">
<code># 85349_TV.hea
85349_TV 1 4000 78592
85349_TV.wav 16+44 1 16 0 0 0 0 TV
</code></pre>
파일명 아래의 첫번째 줄은 순서대로 파일명, 해당 파일의 오디오 채널 수(‘1’은 모노 채널을 의미), 초당 샘플링 주파수(SR, Sampling Rate), 샘플 데이터 포인트의 수입니다. 예를 들어서 초당 4000 샘플링 레이트로 기록된 85349_TV 파일의 전체 데이터 포인트 수 78,592는, 해당 녹음 데이터의 길이가 약 19.5초라는 것을 알 수 있게 해줍니다. 

두 번째 줄은 확장자를 포함한 전체 파일명, 데이터의 저장 형식(여기서는 16진수), 이어지는 4개의 0은 각각 기준선(base line), 체크섬(check sum), 블록 크기(block size), 기록에 사용된 설비를 나타내는데 해당 정보는 기록되지 않았다는 것을 알 수 있습니다. 마지막 TV는 파일명에 표시된 것과 같이 청진한 심장 판막의 위치 정보로 TV는 우심방과 우심실 사이에 존재하는 삼첨판(Tricuspid valve)을 가리킵니다.

<strong>3. 탭 구분 값(.tsv) 파일</strong>
이어서 살펴볼 파일은 tsv 파일입니다. tsv는 탭 기호로 구분된 값(tab-separated value)이라는 뜻으로 탭 기호로 각 행이 구분된 테이블(table) 또는 시트(sheet) 양식의 데이터입니다. 
<pre class="bg-gray-900 text-white rounded p-3 whitespace-pre-wrap">
<code># 85349_TV.tsv
0		2.41625	0
2.41625	2.513605	4
2.513605	2.680327	1
2.680327	2.796819	2
2.796819	2.931789	3
2.931789	3.237129	4
3.237129	3.420327	1
</code></pre>

행별로 구분된 값의 왼쪽부터 오른쪽까지, 모두 세 가지 숫자가 적혀 있습니다. 첫번째 숫자는 해당 녹음 파일의 초를 기준으로 시작 시점, 두 번째 숫자는 종료 시점, 그리고 세 번째 숫자는 이 시작 시점과 종료 시점 사이의 값이 어떤 종류의 소리인지를 0~4까지의 레이블로 표시한 것입니다.

0은 레이블을 표시하지 않았다는 뜻이고, 1은 쿵(‘lub’), 2는 쿵 이후 심장의 수축기(systolic), 3은 쾅(‘dub’), 4는 쾅 이후 심장의 이완기(diastolic)입니다. 하트시그널 프로젝트의 목표는 전체 심장음에서 1과 3을 찾아내는 것이기 때문에, 심장소리와 함께 이 tsv 파일에 적힌 데이터가 가장 중요합니다.

<strong>4. 텍스트(.txt) 파일</strong>
txt 파일에는 연령, 성별, 키, 신장, 임신 여부, 심잡음 여부 등 진료시 수집된 다양한 정보가 기록되어 있습니다. 환자의 관련 정보가 있는 경우도 있고 nan(Not a Number)라는 다소 모호한 형태로 표기된 경우도 있는데 아예 수집되지 않은 경우로 보입니다(공식 자료에 이 표기에 대한 별다른 설명이 보이지 않습니다).

<code># 85349_TV.tsv
0		2.41625	0
2.41625	2.513605	4
2.513605	2.680327	1
2.680327	2.796819	2
2.796819	2.931789	3
2.931789	3.237129	4
3.237129	3.420327	1
</code></pre>
</p>
<h2 class="font-bold text-xl text-gray-700">심장음 포착을 위해 사용한 데이터 포인트와 레이블</h2>
<p class='text leading-relaxed text-gray-600 text-justify'>
피지오넷 2016 챌린지는 심음의 정상/비정상 여부, 2022 챌린지는 심잡음 여부를 판별하기 위해 이 데이터셋을 사용했습니다. 하트시그널 프로젝트는 심장 질환 전조 증상을 포착하기 위한 이 두 챌린지와는 다른, 심장박동 자체를 포착하기 위한 과업을 수행했습니다.

이를 위해 저희가 사용하기로 결정한 데이터는 심장음 녹음 파일과 심음 레이블이 담긴 tsv 파일입니다.

헤더 파일은 파일명과 데이터 길이를 제외하고는 모두 동일한 정보를 담고 있었습니다. 동일한 청진기로 수집된 파일을 동일한 방식을 처리한 때문으로 보입니다. 따라서 전처리 단계에서 참고할 샘플링레이트 4000이라는 수치 이외에는 사용가치가 전혀 없었습니다.

 txt 파일이 담긴 환자의 임상 및 진료 기록을 활용하기 위해서는 전문적인 의학적 지식이 필요해 보였습니다. 무엇보다 데이터 존재 여부가 들쭉날쭉해서, 심장음 포착이라는 과업에 활용하기 위해서는 데이터가 없는 경우에 어떻게 처리할지에 대한 판단이 필요했습니다. 

하트시그널은 2016 챌린지나 2022 챌린지와 달리 질환과 관련된 징후 파악이 아닌, 효과적인 진료의 기초자료로서 심장음을 포착하는 것을 목표로 하는만큼, 효율적인 프로젝트 수행을 위해서 txt 파일은 아예 활용을 배제하기로 했습니다.

EDA 과정을 마치고 이제 학습을 위한 본격적인 데이터셋 구축으로 넘어가려고 했지만, 문제가 있었습니다. 바로 세그멘테이션을 위한 레이블이 없다는 점이었습니다. 3부에서는 데이터 레이블이 없다는 게 어떤 의미인지, 그리고 어떻게 레이블을 직접 구축했는지 다룹니다.


</p>
<div class="text-right">(계속...)</div>

<footer class="text-gray-500">
<hr class="w-1/3 ml-0">
<p class='text-lg leading-relaxed'>참고자료</p>
<p><sup id="footnote-1">1 </sup><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9253493/" target="_blank" class="text-blue-500 hover:text-blue-700">The CirCor DigiScope Dataset: From Murmur Detection to Murmur Classification - PMC</a> <a href="#ref-1">↩</a>
<p><sup id="footnote-2">2 </sup><a href="https://moody-challenge.physionet.org/2022" target="_blank" class="text-blue-500 hover:text-blue-700">Heart Murmur Detection from Phonocardiogram Recordings: The George B. Moody PhysioNet Challenge 2022</a> <a href="#ref-2">↩</a>
<p><sup id="footnote-3">3 </sup><a href="https://www.cinc.org/archives/2016/pdf/179-154.pdf" target="_blank" class="text-blue-500 hover:text-blue-700">Classification of Normal/Abnormal Heart Sound Recordings: the PhysioNet/Computing in Cardiology Challenge 2016</a> <a href="#ref-3">↩</a>
<p><sup id="footnote-4">4 </sup>SUPERB AI 블로그, <a href="https://ko.wikipedia.org/wiki/%EC%8B%AC%EC%9E%A5%ED%8C%90%EB%A7%89" target="_blank" class="text-blue-500 hover:text-blue-700">심장판막 - 위키백과, 우리 모두의 백과사전</a> <a href="#ref-4">↩</a></p>
</footer>
`;
