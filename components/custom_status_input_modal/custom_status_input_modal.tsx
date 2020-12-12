// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import { FormattedMessage } from 'react-intl';

import GenericModal from 'components/generic_modal';
import '../category_modal.scss';
import { ActionFunc } from 'mattermost-redux/types/actions';
import { UserCustomStatus } from 'mattermost-redux/src/types/users';

type Props = {
    onHide: () => void;
    userId: string;
    actions: {
        setCustomStatus: (status: UserCustomStatus) => ActionFunc
    }
};

type State = {
    userId: string;
    message: string;
    currentDate: Date;
}

export default class CustomStatusInputModal extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userId: props.userId || '',
            message: '',
            currentDate: new Date(),
        };
    }

    getText = () => {
        const modalHeaderText = (
            <FormattedMessage
                id='custom_status_input_modal'
                defaultMessage='Set a Custom Status'
            />
        );
        const confirmButtonText = (
            <FormattedMessage
                id='custum_status_input_modal_confirm'
                defaultMessage='Confirm'
            />
        );

        return {
            modalHeaderText,
            confirmButtonText,
        };
    }

    handleChange = (event: any) => {
        this.setState({ message: event.target.value });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.actions.setCustomStatus({
            user_id: this.props.userId,
            text: this.state.message,
            emoji: '',
            expire_time: '',
        });
    }

    render() {
        const {
            modalHeaderText,
            confirmButtonText,
        } = this.getText();

        return (
            <GenericModal
                onHide={this.props.onHide}
                modalHeaderText={modalHeaderText}
                confirmButtonText={confirmButtonText}
                id='customStatusChangeInputModal'
                className={'modal-overflow'}
            >
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type='text'
                            value={this.state.message}
                            onChange={this.handleChange}
                        />
                        <input
                            type='submit'
                            value='Save'
                        />
                    </form>
                </div>
            </GenericModal>
        );
    }
}
