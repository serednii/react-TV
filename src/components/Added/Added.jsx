// import { getAllByPlaceholderText } from '@testing-library/react';
import React from 'react';
import styles from './Added.module.scss';

function Added({
    // isChangeImage,
    //     isChangeDescription,
    //     isChangePrice,
    //     setChangeImage,
    //     setIsChangeDescription,
    //     setIsChangePrice,
        
        setIsAddedCartSave,
        setIsAddedCart
}) {

    const [isChangeImage, setChangeImage] = React.useState('images/sneakers/');
    const [isChangeDescription, setIsChangeDescription] = React.useState('');
    const [isChangePrice, setIsChangePrice] = React.useState('');

    // React.useEffect(() => {
    //     setChangeImage("images/sneakers/");
    // }, []);


    const handleEditCartSave = () => {
        if (!isChangeDescription || !(isChangeImage !== "images/sneakers/") || !isChangePrice) {
            alert("Заповніть всі поля");
          } else {
            setIsAddedCartSave({
              title: isChangeDescription,
              urlImage: isChangeImage,
              price: Number(isChangePrice),
            })
        }
    }


    console.log(!!isChangeImage)
    return (

        <div className={styles.parent}>
            <h2 className={styles.title}>Тут ви можете поміняти інформацію про товар </h2>
            <div className={styles.parentCart}>

                <div className={styles.blockImages}>
                    <p>Ввести шлях до малюнку</p>
                    <img className={styles.images} width={133} height={112} src={isChangeImage && isChangeImage} alt="Sneakers" />
                    <input type="text" value={isChangeImage} onChange={(e => setChangeImage(e.target.value))} />
                </div>

                <div className={styles.blockDescription}>
                    <h3 className={styles.cardDescription}>Ввести опис товару </h3>
                    <input type="text" value={isChangeDescription} onChange={(e) => setIsChangeDescription(e.target.value)} />
                </div>

                <div className={styles.blockPrice}>
                    <span>Ціна</span>
                    <b>Руб</b>
                    <input type="number" value={isChangePrice} onChange={(e) => setIsChangePrice(e.target.value)} />
                </div>

            </div>
            <div className={styles.blockButton} >
                <button onClick={() => setIsAddedCart(false)} >Close</button>
                <button onClick={handleEditCartSave} >Save</button>
            </div>
        </div>
    );
}
export default Added;

