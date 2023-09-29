export function Home(){
    return (
        <div className="home">
            <h1>Welcome to the home page</h1><br/>
            <button onClick={() => {
                location.href="/play"
            }} >
                Let's play
            </button>
        </div>
            );
}