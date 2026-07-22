import './Filter.css';
import { Select } from 'antd';

export function Filter({ HandlePrice, HandleRating, price, rating }) {

    return (

        <div className="filterPart">

            <Select
                className="filterSelect"
                value={price || undefined}
                placeholder="Price"
                style={{ minWidth: 150 }}
                onChange={(value) => HandlePrice(value)}
                options={[
                    { value: '', label: 'None' },
                    { value: 'descPrice', label: 'Price: High to Low' },
                    { value: 'ascPrice', label: 'Price: Low to High' },
                ]}
            />

            <Select
                className="filterSelect"
                value={rating || undefined}
                placeholder="Rating"
                style={{ minWidth: 150 }}
                onChange={(value) => HandleRating(value)}
                options={[
                    { value: '', label: 'None' },
                    { value: 'descRating', label: 'Rating: High to Low' },
                    { value: 'ascRating', label: 'Rating: Low to High' },
                ]}
            />

        </div>
    );
}
