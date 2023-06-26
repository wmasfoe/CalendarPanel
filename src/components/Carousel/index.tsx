import { CarouselPropsType, CarouselItemPropsType } from './types'
import styles from '../../styles/carouse.module.scss'

export function CarouselItem(props: CarouselItemPropsType) {
  return <>
    {props.children}
  </>
}

function Carousel(props: CarouselPropsType) {

  const inlineStyles = {
    width: props.width
  }

  return <div className={styles.carouse} style={inlineStyles}>
    {props.children}
  </div>
}

export default Carousel
