import { Link, useParams } from "react-router-dom";
import Library from "../step01-jsx/Library";
import CommentList from "../step02-component/CommentList";
import FilterCommandList from "../step04-map/FilterCommandList";
import IfExam02List from "../step05-if/IfExam02List";
import Event03 from "../step06-event/Event03";
import Board2 from "../step07-css/Board2";
import CounterEx02 from "../step08-event2/CounterEx02";
import CounterEx10 from "../step08-event2/CounterEx10";
import ProfileSample3 from "../step09-props/ProfileSample3";
import FormSample03 from "../step10-form/FormSample03";
import EffectTest03 from "../step11-hook/EffectTest03";
import ContextTest from "../step13-context/ContextTest";
import UseReducerTest03 from "../step14-Reducer/UseReducerTest03";
import "./LearningGallery.css";

const githubBase =
  "https://github.com/notetester/REACT/tree/main/code/react/01-basics-my-app01/src/pages";

function PreviewCard({ title, children }) {
  return (
    <section className="preview-card">
      <h3>{title}</h3>
      <div className="preview-card__result">{children}</div>
    </section>
  );
}

const examples = [
  {
    id: "jsx-components",
    chapter: "React 02",
    title: "JSX · 컴포넌트 · props · map",
    description:
      "부모 컴포넌트가 props를 내려주고, 배열을 map으로 반복 렌더링한 결과입니다.",
    source: "step01-jsx",
    render: () => (
      <div className="preview-grid">
        <PreviewCard title="props로 책 정보 전달">
          <Library />
        </PreviewCard>
        <PreviewCard title="map으로 댓글 목록 렌더링">
          <CommentList />
        </PreviewCard>
      </div>
    ),
  },
  {
    id: "state-lists",
    chapter: "React 03",
    title: "state · 배열 고차 메서드",
    description:
      "카운터 버튼을 눌러 state에 따른 리렌더링을 확인하고, filter로 관리자 댓글만 남긴 결과를 비교합니다.",
    source: "step08-event2",
    render: () => (
      <div className="preview-grid">
        <PreviewCard title="useState 카운터">
          <CounterEx02 />
        </PreviewCard>
        <PreviewCard title="filter + map 결과">
          <FilterCommandList />
        </PreviewCard>
      </div>
    ),
  },
  {
    id: "events-forms",
    chapter: "React 04",
    title: "조건부 렌더링 · 이벤트 · CSS · form",
    description:
      "버튼과 입력 요소를 직접 조작하며 이벤트, state, 조건부 렌더링이 화면에 반영되는 모습을 확인합니다.",
    source: "step10-form",
    render: () => (
      <div className="preview-stack">
        <PreviewCard title="조건부 렌더링">
          <IfExam02List />
        </PreviewCard>
        <PreviewCard title="MUI 버튼 이벤트">
          <Event03 />
        </PreviewCard>
        <PreviewCard title="외부 CSS와 클릭 이벤트">
          <Board2 />
        </PreviewCard>
        <PreviewCard title="토글 state">
          <CounterEx10 />
        </PreviewCard>
        <PreviewCard title="부모 · 자식 props와 상태 변경">
          <ProfileSample3 />
        </PreviewCard>
        <PreviewCard title="제어 컴포넌트 form">
          <FormSample03 />
        </PreviewCard>
      </div>
    ),
  },
  {
    id: "hooks",
    chapter: "React 05",
    title: "Hooks · useEffect 의존성",
    description:
      "두 카운터 중 첫 번째 값이 바뀔 때만 의존성 배열 [count]에 연결된 Effect가 실행됩니다. 개발자 도구 Console도 함께 보세요.",
    source: "step11-hook",
    render: () => (
      <PreviewCard title="useEffect 의존성 비교">
        <EffectTest03 />
      </PreviewCard>
    ),
  },
  {
    id: "context",
    chapter: "React 06",
    title: "Context API · 테마 공유",
    description:
      "Footer의 Mode 버튼을 누르면 props drilling 없이 공유한 Context 값으로 Header, Main, Footer가 함께 바뀝니다.",
    source: "step13-context",
    render: () => <ContextTest />,
  },
  {
    id: "reducer",
    chapter: "React 07",
    title: "useReducer · 은행 상태 변경",
    description:
      "금액을 입력한 뒤 예금과 출금을 눌러 dispatch(action) → reducer → 새 state 흐름을 확인합니다.",
    source: "step14-Reducer",
    render: () => (
      <PreviewCard title="reducer로 관리하는 잔고">
        <UseReducerTest03 />
      </PreviewCard>
    ),
  },
];

export default function LearningGallery() {
  const { exampleId } = useParams();
  const active = examples.find((example) => example.id === exampleId) || examples[0];

  return (
    <main className="learning-gallery">
      <header className="learning-gallery__header">
        <div>
          <p className="learning-gallery__eyebrow">my-app01 live results</p>
          <h1>React 단계별 결과 탐색기</h1>
          <p>
            노트의 코드를 읽은 뒤 실제 결과를 바로 조작해 보세요. 각 탭은 보존된
            실습 컴포넌트를 그대로 실행합니다.
          </p>
        </div>
        <Link className="learning-gallery__back" to="/">
          Router · Axios 데모로 이동
        </Link>
      </header>

      <nav className="learning-gallery__nav" aria-label="React 단계별 결과">
        {examples.map((example) => (
          <Link
            className={example.id === active.id ? "active" : ""}
            key={example.id}
            to={`/lab/${example.id}`}
          >
            <strong>{example.chapter}</strong>
            <span>{example.title}</span>
          </Link>
        ))}
      </nav>

      <section className="learning-gallery__stage">
        <div className="learning-gallery__stage-header">
          <div>
            <p>{active.chapter}</p>
            <h2>{active.title}</h2>
            <span>{active.description}</span>
          </div>
          <a href={`${githubBase}/${active.source}`} target="_blank" rel="noreferrer">
            GitHub에서 코드 보기
          </a>
        </div>
        <div className="learning-gallery__result">{active.render()}</div>
      </section>
    </main>
  );
}
