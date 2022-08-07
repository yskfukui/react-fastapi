export const ProfileList = (props) => {
    const ProfileNodes = props.data.map((info, index) => (
        <section key={index}>
            <h1>{info.id}</h1>
            <p>{info.username}</p>
            <p>{info.email}</p>
        </section>
    ));
    return (
        <div className="ProfileList">
            {ProfileNodes}
        </div>
    );
};
// 以下の形式のデータを出力するための処理
// [
//     {
        // “id”: 1,
        // “email”: ***,
        // “username”: ********,
        // “password”: *****
//     },
//     {
        // “id”: 2,
        // “email”: ****,
        // “username”: ****,
        // “password”: ****
//     },
// ]