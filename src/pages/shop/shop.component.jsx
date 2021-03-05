import React from 'react';

import SHOP_DATA from './shop.data.js';

import CollectionPreview from  '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component{
    
    //Especificar las props que heredo de React Component.
    //Esto sirve para ser mas especifico
    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA
        };
    }

    render(){
        const { collections } = this.state;
        console.log(collections);
        return(
            <div className='shop-page'>
                { collections.map(({id , ...otherCollectionProps }) => (
                    <CollectionPreview 
                        key={id} 
                        {...otherCollectionProps}
                    />
                ))
                }
            </div>
        );
    }
}

export default ShopPage;