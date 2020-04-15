import React from 'react';
import { UserContext } from '../../context';
import { Grid, makeStyles, Typography, IconButton, Avatar, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    avatarButton: {
        padding: 0
    },
    avatar: {
        width: 'auto',
        maxWidth: '10em',
        height: 'auto',
        bagroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            maxWidth: '12em',
            height: 'fit-content'
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '6em',
            height: 'fit-content',
            webkitTransition: '.3s ease-in-out',
            transition: '.3s ease-in-out'
        },
        '&:hover': {
            opacity: '.5'
        }
    },
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
    input: {
        display: 'none'
    },
    infoContainer: {
        height: '100%',
        marginTop: 0,
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        }
    },
    root: {
        display: 'flex  ',
        width: 'inherit',
        margin: 0
    },
    textField: {
        marginTop: theme.spacing(1),
        '& > div': {
            borderRadius: 0
        }
    },
    fieldContainer: {
        paddingRight: theme.spacing(3)
    }
}));

export function UserInformationEdit(props) {
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext);
    const [userInfo, setUserInfo] = React.useState({
        "email_address": user["email_address"],
        "image": user["image"],
        "name": user["name"],
        "phone_number": user["phone_number"],
        "postal_address": user["postal_address"]
    });

    const handleCapture = (target) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            var result = e.target.result;
            result = result.split(",").pop();
            setUserInfo({
                ...userInfo,
                "image": result
            });
        };
    };


    function handleChange(e) {
        var id = e.currentTarget.id;
        var value = e.currentTarget.value;
        setUserInfo({
            ...userInfo,
            [id]: value
        });
    }


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
                <Grid item lg={6} md={6} xs={12} className={classes.fieldContainer}>
                    <Typography variant="body1">
                        <b>{titles[i]}</b>
                    </Typography>
                    <TextField
                        fullWidth
                        value={userInfo[fields[i]]}
                        id={fields[i]}
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                        className={classes.textField}
                    />
                </Grid>
            )
        }
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
                <div>
                    <IconButton>
                        <SaveIcon color="primary" onClick={() => props.onClick()} />
                    </IconButton>
                    <IconButton>
                        <CloseIcon onClick={() => props.onClick()}  />
                    </IconButton>
                </div>
            </Grid>
            <Grid item lg={3} md={5} sm={8} xs={12} className={classes.avatarContainer}>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => handleCapture(e.target)} />
                <label htmlFor="icon-button-file">
                    <IconButton className={classes.avatarButton} color="primary" aria-label="upload picture" component="span" >
                        <Avatar
                            className={classes.avatar}
                            variant="square"
                            alt={user["name"]}
                            src={'data:image/png;base64,' + userInfo["image"]} />
                    </IconButton>
                </label>
            </Grid>
            <Grid lg={9} md={7} sm={4} xs={12}>
                <Grid container
                    className={classes.infoContainer}
                    justify='space-between'
                    alignItems="center"
                >
                    {renderFields()}
                </Grid>
            </Grid>
        </Grid>
    )
}