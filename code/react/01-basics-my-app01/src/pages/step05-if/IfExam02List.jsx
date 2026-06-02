import IfExam02 from "./IfExam02";

export default function IfExam02List(params) {
    return(
        <>
          <h2>조건부 렌더링(if)</h2>
          <ul>
             <IfExam02 name="고길동" isPacked={true} />
             <IfExam02 name="둘리" isPacked={false} />
             <IfExam02 name="희동이" isPacked={false} />
             <IfExam02 name="마이콜" isPacked={true} />
          </ul>
        </>
    );
}