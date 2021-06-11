function Input({setter, ...props}) {
    return <input
        {...props}
        onChange={
            function (event) {
                setter(event.target.value)
            }
        }/>
}

export default Input;
