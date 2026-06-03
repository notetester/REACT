// 노트(MkDocs) 안에서 "코드 옆/아래에 결과"를 보여주기 위한 임베드 전용 화면.
// 갤러리 헤더/탭 없이 exampleId 하나에 해당하는 실습 컴포넌트만 렌더한다.
// 사용: /lab/embed/<id>  (소형 iframe으로 노트에 삽입)
import { useParams } from "react-router-dom";

// 보존된 실습 컴포넌트 재사용
import Library from "../step01-jsx/Library";
import CommentList from "../step02-component/CommentList";
import NumberCount from "../step03-state/NumberCount";
import FilterCommandList from "../step04-map/FilterCommandList";
import FindCommandList from "../step04-map/FindCommandList";
import ReduceCommandList from "../step04-map/ReduceCommandList";
import SomeEveryCommandList from "../step04-map/SomeEveryCommandList";
import IfExam02List from "../step05-if/IfExam02List";
import Event01 from "../step06-event/Event01";
import Event03 from "../step06-event/Event03";
import Board2 from "../step07-css/Board2";
import CounterEx02 from "../step08-event2/CounterEx02";
import CounterEx10 from "../step08-event2/CounterEx10";
import ProfileSample3 from "../step09-props/ProfileSample3";
import FormSample01 from "../step10-form/FormSample01";
import FormSample03 from "../step10-form/FormSample03";
import EffectTest03 from "../step11-hook/EffectTest03";
import UseMemo02 from "../step11-hook/UseMemo02";
import UseCallBack02 from "../step11-hook/UseCallBack02";
import UseIdTest02 from "../step11-hook/UseIdTest02";
import ContextTest from "../step13-context/ContextTest";
import UseReducerTest03 from "../step14-Reducer/UseReducerTest03";
import "./EmbedExample.css";

// id → { 컴포넌트, 소스 폴더, 힌트 }
// n = 화면에 띄우려면 index.js 트리에 넣을 컴포넌트 태그명
const EXAMPLES = {
  "jsx-library":     { c: Library,            n: "Library",            src: "step01-jsx",     hint: "props로 책 정보 전달" },
  "jsx-comments":    { c: CommentList,        n: "CommentList",        src: "step02-component", hint: "map + key로 목록 렌더" },
  "state-why":       { c: NumberCount,        n: "NumberCount",        src: "step03-state",   hint: "일반 변수는 화면이 안 바뀜(콘솔만)" },
  "state-counter":   { c: CounterEx02,        n: "CounterEx02",        src: "step08-event2",  hint: "useState 카운터" },
  "array-filter":    { c: FilterCommandList,  n: "FilterCommandList",  src: "step04-map",     hint: "filter로 관리자만" },
  "array-find":      { c: FindCommandList,    n: "FindCommandList",    src: "step04-map",     hint: "find로 첫 항목" },
  "array-reduce":    { c: ReduceCommandList,  n: "ReduceCommandList",  src: "step04-map",     hint: "reduce 누적 통계" },
  "array-someevery": { c: SomeEveryCommandList, n: "SomeEveryCommandList", src: "step04-map", hint: "some / every" },
  "cond-render":     { c: IfExam02List,       n: "IfExam02List",       src: "step05-if",      hint: "조건부 렌더링" },
  "event-handlers":  { c: Event03,            n: "Event03",            src: "step06-event",   hint: "이벤트 핸들러(Console 확인)" },
  "event-arg":       { c: Event01,            n: "Event01",            src: "step06-event",   hint: "인자 전달은 화살표로 감싸기" },
  "css-board":       { c: Board2,             n: "Board2",             src: "step07-css",     hint: "CSS + 클릭 이벤트" },
  "counter-toggle":  { c: CounterEx10,        n: "CounterEx10",        src: "step08-event2",  hint: "토글 state" },
  "props-profile":   { c: ProfileSample3,     n: "ProfileSample3",     src: "step09-props",   hint: "부모↔자식 props/상태" },
  "form-basic":      { c: FormSample01,       n: "FormSample01",       src: "step10-form",    hint: "제어 컴포넌트 기본" },
  "form-controlled": { c: FormSample03,       n: "FormSample03",       src: "step10-form",    hint: "체크박스 그룹 제어" },
  "effect-deps":     { c: EffectTest03,       n: "EffectTest03",       src: "step11-hook",    hint: "useEffect 의존성(Console 확인)" },
  "usememo":         { c: UseMemo02,          n: "UseMemo02",          src: "step11-hook",    hint: "useMemo 캐싱" },
  "usecallback":     { c: UseCallBack02,      n: "UseCallBack02",      src: "step11-hook",    hint: "useCallback 함수 캐싱" },
  "useid":           { c: UseIdTest02,        n: "UseIdTest02",        src: "step11-hook",    hint: "useId 고유 id" },
  "context-theme":   { c: ContextTest,        n: "ContextTest",        src: "step13-context", hint: "Context로 테마 공유" },
  "reducer-bank":    { c: UseReducerTest03,   n: "UseReducerTest03",   src: "step14-Reducer", hint: "useReducer 잔고" },
};

const githubBase =
  "https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages";

export default function EmbedExample() {
  const { exampleId } = useParams();
  const example = EXAMPLES[exampleId];

  if (!example) {
    return (
      <div className="embed-example embed-example--missing">
        <p>알 수 없는 예제: <code>{String(exampleId)}</code></p>
        <a href="#/lab">전체 결과 탐색기로 이동</a>
      </div>
    );
  }

  const Component = example.c;
  return (
    <div className="embed-example">
      <div className="embed-example__bar">
        <span className="embed-example__badge">▶ live</span>
        <span className="embed-example__mount">📍 <code>index.js</code>에 <code>{`<${example.n} />`}</code> (주석 해제)</span>
        <span className="embed-example__hint">{example.hint}</span>
        <a
          className="embed-example__src"
          href={`${githubBase}/${example.src}`}
          target="_blank"
          rel="noreferrer"
        >
          소스 ↗
        </a>
      </div>
      <div className="embed-example__stage">
        <Component />
      </div>
    </div>
  );
}
