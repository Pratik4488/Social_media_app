import "./home.css"
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Rightbar } from '../../components/rightbar/Rightbar'
import { Feed } from '../../components/feed/Feed'
import { TopBar } from '../../components/topbar/topBar'

export const Home = () => {
    return (
        <>
            <TopBar />
            <div className="homeContainer">
            <Sidebar />
            <Feed />
            <Rightbar />
            </div>
        </>
    )
}
