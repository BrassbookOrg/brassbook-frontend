import pic1 from './Frame6.png'
import pic2 from './istockphoto-528068196-612x612-Photoroom 1.png'
import styles from './PublicationExample.module.css'

function PublicationExample() {
    return (
        <>
            <div className={styles.wrapper}>
                <h1 className={styles.h}>Пример статьи</h1>
                <img className={styles.pic1} src={pic1} alt="" />
                <div className={styles.textContainer}>
                    <p className={styles.text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptatem dolore sint qui vel ullam accusamus, itaque, eos molestias adipisci cumque quod numquam labore tempore voluptatibus, error natus dolores nesciunt.</p>
                    <p className={styles.text}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem odit exercitationem non! Dolores sit nam similique, odit fuga rerum labore.</p>
                </div>
                <div className={styles.textContainerWithPic}>
                    <img className={styles.pic2} src={pic2} alt="" />
                    <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis commodi nemo maxime quae aliquam dignissimos, ab odio dolore iusto quibusdam libero iste fuga aspernatur autem animi rerum quis doloremque nisi!</p>
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum deleniti doloribus eos, amet eveniet ipsam temporibus, fugit vitae quod explicabo quidem nesciunt. Quis temporibus tempora nobis suscipit libero magnam consequuntur.</p>
                    <p className={styles.text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti magnam ducimus expedita. Qui dicta a autem sequi molestias ipsum pariatur?</p>
                    <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero tempore rerum atque, aspernatur eaque quo maxime suscipit veniam velit explicabo!</p>
                </div>
            </div>
        </>
    )
}

export default PublicationExample