import { MoralisProvider } from "react-moralis";
import React, { Component } from 'react';
import { Form} from 'semantic-ui-react';

class Balance extends Component {
    render() {
        return (
            <div className='home-page'>
                SWAP TOKEN
                <Form>
                    <Form.Field>
                    <input
                        required
                        type='text'
                        placeholder='Amount'
                        value={this.state.username}
                        autoComplete="Amount"
                    />
                    </Form.Field>
                </Form>
                <MoralisProvider serverUrl="https://zsrrii5azu1d.usemoralis.com:2053/server" appId="mmoLsVuBfHLJ8Nnx9ojCD6ieBeRVuyeIktge7uwP" />
                
            </div>
        );
    }
}

export default Balance;