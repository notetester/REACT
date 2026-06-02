// export default function Item(props) {
//     return(
//         <ul>
//             <li>과목 : {props.title}</li>
//             <li>내용 : {props.content}</li>
//         </ul>
//     );
// }

export default function Item({title, content}) {
    return(
        <ul>
            <li>과목 : {title} 과목</li>
            <li>내용 : {content}</li>
        </ul>
    );
}