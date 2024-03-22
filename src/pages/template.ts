// src/pages/blog-contents/template.ts
export const title: string = "컨텐츠 제목";

export const content: string = `
<p class='text-lg leading-relaxed text-gray-600'>부제목</p>
<div class="text-right">
  <a href="your-link-url" class="text-blue-500 hover:text-blue-800">팀 소개(작성자)</a>
</div>
<p class='text-gray-600'>
본문 내용입니다.<sup><a href="#footnote-1" id="ref-1">1</a></sup> 

</p>
<h2 class="font-bold text-xl text-gray-700">중간 제목입니다.</h2>

</p>
<div class="text-right">(계속...)</div>

<footer class="text-gray-500">
<hr class="w-1/3 ml-0">
<p class='text-lg leading-relaxed'>참고자료</p>
  <p><sup id="footnote-1">1</sup> 여기에는 각주 내용이 들어갑니다. <a href="#ref-1">↩</a></p>
</footer>
`;
