
import React from 'react';
import styles from './Edit.module.scss';

function Edit({ obj,
    setIsEditCartSave,
    setEditCart
 }) {

        const [description, setDescription] = React.useState(obj.title);
        const [price, setPrice] = React.useState(obj.price);
        const [selectedFile, setSelectedFile] = React.useState(null);
        selectedFile && console.log(selectedFile)

const handleEditCartSave = () => {
    setIsEditCartSave({
        title:description,
        urlImage: "images/tv/" +  selectedFile.name,
        price: Number(price),
        id: obj.id,
      })
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
                    <h3 className={styles.cardDescription}>{obj.title}</h3>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className={styles.blockPrice}>
                    <span>Price</span>
                    <b>{obj.price}<span>CZK</span></b>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className={styles.blockButton} >
                    <button onClick={() => setEditCart(false)} >Close</button>
                    <button onClick={handleEditCartSave} >Save</button>
                </div>
            </form>
        </div>
    );
}
export default Edit;

