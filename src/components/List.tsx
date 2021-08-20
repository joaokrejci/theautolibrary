import './List.scss'

export interface ListableItem {
	[index: string]: any
	id: number
}

export interface ListProps {
	keys: string[]
	data: ListableItem[]
	onSelect: (id: number) => void
}

const List = ({ keys, data, onSelect }: ListProps) => {
	return (
		<table className="List">
			<thead>
				<tr>
					{keys.map(key => (
						<td key={key}>{key.toLocaleUpperCase()}</td>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map(item => (
					<tr onClick={() => onSelect(item.id)} key={item.id}>
						{keys.map(key => (
							<td key={key}>{item[key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default List
