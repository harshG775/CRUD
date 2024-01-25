import "./App.css";
import axios from "axios";
import useQuery from "./hooks/useQuery";
import { useEffect } from "react";

function AllUsers({ users, handleDeleteUser }) {
	if (users.length <= 0) {
		return <p>no users</p>;
	}
	return (
        <>
            <h2>users: {users.length}</h2>
            <table>
                <thead>
                    <tr>
                        <th>email</th>
                        <th>username</th>
                        <th>password</th>
                        <th>courses</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user,i) => (
                        <tr key={i}>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.courses.length ? user.courses.map((course,i) => ( <div key={i}>{course.title}</div> )) : "noCourses"}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
	);
}
function CreateUsers({handleClick}) {
    const handleCreateUser = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const resp = await axios.post("/api/v1/users",{
                username:form.get("username"),
                email:form.get("email"),
                password:form.get("password"),
                courses:[]
            })
        console.log(resp.data)
        handleClick()

    }
    return (
        <form onSubmit={handleCreateUser}>
            <ul>
                <li>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" />
                </li>
                <li>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" />
                </li>
                <li>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                </li>
            </ul>
            <div>
                <button>submit</button>
            </div>
        </form>
    )
}
function App() {
	const { result: usersResult, isLoading, isSuccess, error, setTrigger, } = useQuery(() => axios.get("/api/v1/users"));
	const handleClick = async (prop) => {
        setTrigger((prev) => prev + 1);
	};
    useEffect(()=>{
        handleClick()
    },[])
    const handleDeleteUser = async (id) => {
        const resp = await axios.delete(`/api/v1/users/${id}`)
        if (resp.status === 200) {
            setTrigger((prev) => prev + 1);
        }
    }
	return (
		<div>
			<h1>API testing</h1>
			
            <CreateUsers handleClick={handleClick}/>
            <div>
                <h2>users: {usersResult?.data.data.users.length}</h2>
                <button onClick={handleClick}>Refresh</button>
            </div>
			{isSuccess && <AllUsers users={usersResult?.data.data.users} handleDeleteUser={handleDeleteUser}/>}
		</div>
	);
}

export default App;
