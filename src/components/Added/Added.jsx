
import React from 'react';
import styles from './Added.module.scss';
import { makeId } from '../../hooks/makeId';
function Added({ 
        setIsAddedCartSave,
        setIsAddedCart
}) {
  console.log('render added')
  
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null);
    selectedFile && console.log(selectedFile)

    const handleEditCartSave = () => {
        if (!description  || !price) {
            alert("Заповніть всі поля");
          } else {
            setIsAddedCartSave({
              title:description,
              urlImage: "images/tv/" +  selectedFile.name,
              price: Number(price),
              parentId: makeId(8),
            })
        }
    }

    return (
        <div className={styles.parent}>
            <h2 className={styles.title}>Here you can change information about the product</h2>
            <form className={styles.parentCart}>

                <div className={styles.blockImages}>
                    <img className={styles.images} width={133} height={112} src={selectedFile && "images/tv/" +  selectedFile.name} alt="tv" />
                    <input
                    type="file" 
                    accept="images/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>

                <div className={styles.blockDescription}>
                    <h3 className={styles.cardDescription}>Enter a description of the product </h3>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className={styles.blockPrice}>
                    <span>Price</span>
                    <b>CZK</b>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

            <div className={styles.blockButton} >
                <button onClick={() => setIsAddedCart(false)} >Close</button>
                <button onClick={handleEditCartSave} >Save</button>
            </div>
            </form>
        </div>
    );
}
export default Added;

