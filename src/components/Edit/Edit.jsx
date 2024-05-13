// import { getAllByPlaceholderText } from '@testing-library/react';
import React from 'react';
import styles from './Edit.module.scss';

function Edit({ obj,
    setIsEditCartSave,
    setEditCart
 }) {

        const [isChangeImage, setChangeImage] = React.useState('');
        const [isChangeDescription, setIsChangeDescription] = React.useState('');
        const [isChangePrice, setIsChangePrice] = React.useState('');

const handleEditCartSave = () => {
    isChangeImage && (obj.urlImage = isChangeImage);
    isChangeDescription && (obj.title = isChangeDescription);
    isChangePrice && (obj.price = Number(isChangePrice));
    setIsEditCartSave(obj)
}


    return (

        <div className={styles.parent}>
            <h2 className={styles.title}>Тут ви можете поміняти інформацію про товар</h2>
            <div className={styles.parentCart}>

                <div className={styles.blockImages}>
                    <img className={styles.images} width={133} height={112} src={isChangeImage ? isChangeImage : obj.urlImage} alt="Sneakers" />
                    <p>{obj.urlImage}</p>
                    <input type="text" value={isChangeImage} onChange={(e => setChangeImage(e.target.value))} />
                    <button onClick={() => setChangeImage(obj.urlImage)} >Copy</button>
                </div>

                <div className={styles.blockDescription}>
                    <h3 className={styles.cardDescription}>{obj.title}</h3>
                    <input type="text" value={isChangeDescription} onChange={(e) => setIsChangeDescription(e.target.value)} />
                    <button onClick={() => setIsChangeDescription(obj.title)} >Copy</button>
                </div>

                <div className={styles.blockPrice}>
                    <span>Ціна</span>
                    <b>{obj.price}<span>Руб</span></b>
                    <input type="number" value={isChangePrice} onChange={(e) => setIsChangePrice(e.target.value)} />
                    <button onClick={() => setIsChangePrice(obj.price)} >Copy</button>
                </div>

            </div>
            <div className={styles.blockButton} >
                <button onClick={() => setEditCart(false)} >Close</button>
                <button onClick={handleEditCartSave} >Save</button>
            </div>
        </div>
    );
}
export default Edit;

