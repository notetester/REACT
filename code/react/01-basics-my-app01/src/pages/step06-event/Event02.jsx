
// 렌더링과 무관하게 한번만 정의 됨
// 다른 파일에서 import해서 재사용 가능
// 첫글자 대문자 이면 컴포넌트이다.
// children : 컨포넌트을 사용할때 시작 태그와 끝태그 사이에 넣은 모든 것이 children 이다.
function AlertButton({msg, children}) {
  return(
    <button onClick={()=>alert(msg)}>{children}</button>
  );
}

// 자바스크립트 함수
// function formatData(data) {
    
// }
export default function Event02(params) {
    return(
        <div>
            <AlertButton msg="play">PlayButton</AlertButton><br />
            <AlertButton msg="upload">UploadButton</AlertButton><br />
            <AlertButton msg="download">DownloadButton</AlertButton><br />
        </div>
    );
}