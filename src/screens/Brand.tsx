import Error from '../components/Error'
import { useParams } from 'react-router'
import { useRequest } from '../infra/useRequest'
import { BRANDS_API } from '../infra/RouteHelpers'
import Loading from '../components/Loading'
import { Brand as BrandType } from '../types/Brand'

import './Brand.scss'

const Brand = () => {
	const { id } = useParams<{ id?: string }>()

	const {
		data: brand,
		loading,
		error,
	} = useRequest<BrandType>(`${BRANDS_API}/${id}`)

	return (
		<div className="Brand">
			{loading && <Loading />}
			{error && <Error />}

			{!loading && !error && brand && (
				<>
					<div className="Brand-image">
						<img src={brand.image} alt="" />
					</div>
					<div className="Brand-description">
						<h1>
							<span className="Brand-id">{brand.id}.</span> {brand.name}
						</h1>
						<h2>{brand.origin}</h2>
					</div>
				</>
			)}
		</div>
	)
}

export default Brand
