import {Routes, Route} from "react-router-dom";
import HomeComponents from "../pages/home/HomeComponents";
import PageNotFound from "../pages/errors/PageNotFound";
import AddUserComponents from "../pages/users/AddUserComponents";
import LoginComponents from "../pages/auth/LoginComponents";
import AuthMiddleware from "../middleware/AuthMiddleware";
import AddHouseComponent from "../admin/pages/house/AddHouseComponent";
import ShowHouseComponents from "../admin/pages/house/ShowHouseComponents";
import UpdateUserComponents from "../admin/pages/users/UpdateUserComponents";
import AdminDashboardComponents from "../admin/pages/AdminDashboardComponents";
import AddBannerComponents from "../admin/pages/banner/AddBannerComponents";
import ShowBannerComponents from "../admin/pages/banner/ShowBannerComponents";
import UpdateBannerComponents from "../admin/pages/banner/UpdateBannerComponents";
import ShowUserComponents from "../admin/pages/users/ShowUserComponents";
import UpdateHouseComponents from "../admin/pages/house/UpdateHouseComponents";
import SettingComponents from "../admin/pages/SettingComponents";
import OrderListComponents from "../admin/pages/house/OrderListComponents";
import ContactComponents from "../pages/contact/ContactComponents";
import AddBlogComponents from "../admin/pages/blogs/AddBlogComponents";
import ShowBlogComponents from "../admin/pages/blogs/ShowBlogComponents";
import UpdateBlogComponents from "../admin/pages/blogs/UpdateBlogComponents";
import ChatComponents from "../admin/pages/chat/ChatComponents";
import ChangePasswordComponents from "../admin/pages/users/ChangePasswordComponents";
import HouseDetailsComponents from "../pages/house/HouseDetailsComponents";
import AllHouseList from "../pages/house/AllHouseListComponents";
import ContactListComponents from "../admin/pages/contact/ContactListComponents";
import BlogListComponents from "../pages/blogs/BlogListComponents";
import AboutUsComponents from "../pages/about/AboutUsComponents";
import FaqComponents from "../pages/faq/FaqComponents";
import BlogDetailsComponents from "../pages/blogs/BlogDetailsComponents";
import AddAboutComponents from "../admin/pages/about/AddAboutComponents";
import ShowAboutComponents from "../admin/pages/about/ShowAboutComponents";
import UpdateAboutComponents from "../admin/pages/about/UpdateAboutComponents";
import HouseGallery from "../admin/pages/house/HouseGallery";
import RoleMiddleware from "../middleware/RoleMiddleware";
import AdminMiddleware from "../middleware/AdminMiddleware";
import BookConfirmComponents from "../pages/book/BookConfirmComponents";

function RouterComponents() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeComponents/>}/>
                <Route path="/about-us" element={<AboutUsComponents/>}/>
                <Route path="/faq" element={<FaqComponents/>}/>
                <Route path="/login" element={<LoginComponents/>}/>
                <Route path="/register" element={<AddUserComponents/>}/>
                <Route path="/contact-us" element={<ContactComponents/>}/>
                <Route path="/house-details/:id" element={<HouseDetailsComponents/>}/>
                <Route path="/house-list" element={<AllHouseList/>}/>
                <Route path="/booking-confirm/:bookId" element={<BookConfirmComponents/>}/>
                <Route path="/blog-list" element={<BlogListComponents/>}/>
                <Route path="/blog-details/:id" element={<BlogDetailsComponents/>}/>


                <Route element={<AuthMiddleware/>}>
                    <Route path="/dashboard" element={<AdminDashboardComponents/>}/>

                    <Route element={<RoleMiddleware/>}>
                        <Route path="/add-house" element={<AddHouseComponent/>}/>
                        <Route path="/show-house" element={<ShowHouseComponents/>}/>
                        <Route path="/update-house/:id" element={<UpdateHouseComponents/>}/>
                        <Route path="/house-gallery/:id" element={<HouseGallery/>}/>

                    </Route>
                    <Route element={<AdminMiddleware/>}>
                        <Route path="/add-about" element={<AddAboutComponents/>}/>
                        <Route path="/show-about" element={<ShowAboutComponents/>}/>
                        <Route path="/update-about/:id" element={<UpdateAboutComponents/>}/>
                        <Route path="/add-banner" element={<AddBannerComponents/>}/>
                        <Route path="/show-banner" element={<ShowBannerComponents/>}/>
                        <Route path="/update-banner/:id" element={<UpdateBannerComponents/>}/>
                        <Route path="/show-users" element={<ShowUserComponents/>}/>
                        <Route path="/add-blog" element={<AddBlogComponents/>}/>
                        <Route path="/show-blog" element={<ShowBlogComponents/>}/>
                        <Route path="/update-blog/:id" element={<UpdateBlogComponents/>}/>
                        <Route path="/contact-list" element={<ContactListComponents/>}/>
                        <Route path="/setting" element={<SettingComponents/>}/>
                    </Route>


                    <Route path="/order-list" element={<OrderListComponents/>}/>
                    <Route path="/update-profile" element={<UpdateUserComponents/>}/>
                    <Route path="/change-password" element={<ChangePasswordComponents/>}/>
                    <Route path="/chat" element={<ChatComponents/>}/>
                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )

}

export default RouterComponents;