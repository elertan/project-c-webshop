import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import {Typography} from "@material-ui/core";

interface IProps {}

class Artists extends React.Component<IProps> {
    public render() {
        return (
            <AppLayout>
                <Typography>
                    Here all known artists will be shown.
                </Typography>
            </AppLayout>
        );
    }
}

export default Artists;
