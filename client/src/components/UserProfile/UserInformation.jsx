import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { UserContext } from '../../context';
import { Grid, Avatar, makeStyles } from '@material-ui/core';
import { SecondaryButton } from '../../shared-components';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left'
        }
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    infoContainer: {
        height: '100%',
        marginTop: 0,
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        }
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    avatar: {
        width: 'auto',
        maxWidth: '10em',
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            maxWidth: '12em',
            height: 'fit-content'
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '6em',
            height: 'fit-content'
        }
    },
    changePasswordButton: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2)
        }
    }
}));

export function UserInformation(props) {
    const { user } = React.useContext(UserContext);
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);

    function renderFields() {
        const fields = ["name", "email_address", "postal_address", "phone_number"]
        const titles = [
            "Nom i cognoms",
            "Correu electrònic",
            "Adreça postal",
            "Telèfon"
        ]
        var output = []
        for (var i in fields) {
            output.push(
                <Grid item lg={6} md={6} xs={12}>
                    <Typography variant="body1">
                        <b>{titles[i]}</b>
                    </Typography>
                    <Typography variant="body1">
                        {user[fields[i]]}
                    </Typography>
                </Grid>
            )
        }
        return output;
    }

    function renderDataFields() {
        var output = [];
        output.push(
            <Grid item lg={3} md={5} sm={8} xs={12} className={classes.avatarContainer}>
                <Avatar
                    className={classes.avatar}
                    variant="square"
                    alt={user["name"]}
                    src={'data:image/png;base64,' + user["image"]}
                />
            </Grid>
        )
        output.push(
            <Grid lg={9} md={7} sm={4} xs={12}>
                <Grid container
                    className={classes.infoContainer}
                    justify='space-between'
                    alignItems="center"
                >
                    {renderFields()}
                    <Grid item xs={12} className={classes.changePasswordButton}>
                        <SecondaryButton onClick={() => setOpenModal(true)}> Canviar contrasenya </SecondaryButton>
                    </Grid>
                </Grid>
            </Grid>
        )
        return output;

    }



    return (
        <Grid container
            direction="row"
            justify="center"
        >
            <Grid item xs={12} className={classes.titleContainer}>
                <Typography variant="h1" className={classes.title}>
                    Hola {user.name}!
                </Typography>
                <IconButton>
                    <EditIcon color="primary" onClick={()=>props.onClick()} />
                </IconButton>
            </Grid>
            { renderDataFields() }
        </Grid>
    )
}