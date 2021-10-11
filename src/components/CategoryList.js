import React, { Component } from 'react'

export class CategoryList extends Component {
    render() {
        return (
            <div className="categories-holder">
                {this.props.categories.map(category => (
                    <div key={category.id} className="category-item" 
                    onClick={this.props.onSelect.bind(this, category.id)}>
                        {category.name}
                    </div>
                ))}
            </div>
        )
    }
}

export default CategoryList
