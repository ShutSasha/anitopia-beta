import { FC } from 'react'
import ContentLoader from 'react-content-loader'

interface SkeletonParametrs {
   width: number
   height: number
}
//150w
//250h
export const Skeleton: FC<SkeletonParametrs> = ({ width, height }) => (
   <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
   >
      <rect x='0' y='0' rx='0' ry='0' width={width} height={height} />
   </ContentLoader>
)
