const MyButton = ({ count, setCount }) => {
	return <button onClick={() => { setCount(count + 1); }}>We have been pressed {count} times!</button>
}

export default MyButton;
