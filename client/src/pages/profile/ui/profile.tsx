import { FC, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Header } from "../../../widgets/header";
import styles from "./styles.module.scss";
import { ProfileBgImg } from "../../../features";
import { useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../not-found";
import { DefaultButton, InputAuth, Loader } from "../../../shared";
import { uploadImage } from "../api/uploadImage";
import { checkUploadStatus } from "../helpers/checkUploadStatus";
import { MainUserInfo } from "../../../widgets/main-user-info";
import { Modal } from "../../../widgets/Modal";

export const Profile: FC = observer(() => {
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const { store } = useContext(Context);
   const navigate = useNavigate();
   const [img, setImage] = useState<File | null>(null);
   const [modalActive, setModalActive] = useState<boolean>(false);

   //! ПОФИКСИТЬ, ПРОВЕРИТЬ, ИСПРАВИТЬ. ЕБАЛ ВАШ ТАЙП СКРИПТ РАКЕТА ПУШКА АХАХАХ
   console.log(store.user.age);
   const [lastName, setLastName] = useState<string | null>("");
   const [firstName, setFirstName] = useState<string | null>("");
   const [age, setAge] = useState<number | null>(null);
   const [sex, setSex] = useState<string | null>("");
   const [country, setCountry] = useState<string | null>("");

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const selectedImage = event.target.files[0];
         setImage(selectedImage);
      }
   };

   useEffect(() => {
      let intervalId: any;

      if (img) {
         store.isLoading = true;

         try {
            intervalId = uploadImage(img, store.user.username, () =>
               checkUploadStatus(
                  store.user.username,
                  intervalId,
                  store.isLoading
               )
            );
         } catch (error) {
            clearInterval(intervalId);
            store.isLoading = false;
         }
      }

      return () => clearInterval(intervalId);
   }, [img]);

   const handleClick = () => {
      fileInputRef.current?.click();
   };

   if (store.isLoading) {
      return <Loader />;
   }

   if (!store.isAuth) {
      navigate("/login");
      return <NotFoundPage />;
   }

   if (store.isAuth) {
      return (
         <div>
            <Header />
            <div className={styles.container}>
               <ProfileBgImg />
               <div className={styles.profile_wrapper}>
                  <MainUserInfo
                     handleClick={handleClick}
                     fileInputRef={fileInputRef}
                     handleImageChange={handleImageChange}
                  />
                  <button
                     onClick={() => setModalActive(true)}
                     className={styles.edit_btn}
                  ></button>
               </div>
            </div>
            <button onClick={() => setModalActive(true)}>Test modal</button>
            <Modal active={modalActive} setActive={setModalActive} headerText={"Редактирование профиля"}>
               <>
                  <div className={styles.modal_wrapper}>
                     <div className={styles.modal_container}>
                        <div className={styles.modal_container_input}>
                           <InputAuth
                              labelColor={"black"} img={null} setValue={setFirstName}
                              htmlFor={"firstName"} type={"text"}
                              textLabel={"Имя"} />
                           <InputAuth
                              labelColor={"black"} img={null} setValue={setLastName}
                              htmlFor={"lastName"} type={"text"}
                              textLabel={"Фамилия"} />
                        </div>
                        <div className={styles.modal_container_input}>
                           <InputAuth
                              labelColor={"black"} img={null} setValue={setAge} htmlFor={"age"}
                              type={"number"}
                              value={age}
                              textLabel={"Возраст"}

                           />
                           <InputAuth
                              labelColor={"black"} img={null} setValue={setSex} htmlFor={"Пол"}
                              type={"text"} textLabel={"Пол"} />
                        </div>
                     </div>

                     <InputAuth
                        labelColor={"black"} img={null} setValue={setCountry} htmlFor={"Пол"}
                        type={"text"} textLabel={"Страна"} />
                     <div className={styles.btn_container}>
                        <DefaultButton text={"Редактировать"} padding={"10px"} color={"white"}
                                       backgroundColor={"#ff6666"} />
                     </div>
                  </div>
               </>
            </Modal>
         </div>
      );
   }
});
