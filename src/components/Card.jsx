import React from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({id, name, price, picture}) {
  const classes = useStyles();

  const [readOnly, setReadOnly] = React.useState(true)
  const [newValues, setNewValues] = React.useState({name, price})

  const handleChangeReadOnly = () => {
    readOnly ? setReadOnly(false) : setReadOnly(true)
  }

  const deleteItem = () => {
    axios.delete(`http://localhost:4040/courses/${id}`)
    .then((res) =>
      console.log("Status :", res.status),
      toast.success(`super item deleted`)
    )
    .catch(err => {
      console.error('Something went bad', err)
      toast.error(`${err.message}`)
    })
  }

  const changeInputValue = (e) => {
    setNewValues({
      ...newValues,
      [e.target.name] : e.target.value
    })
  }

  const modifyInput = () => {
    const url = `http://localhost:4040/courses/${id}`
     axios.patch(url, newValues)
     .then(res => {
       console.log("Status :", res.status)
       console.log("Datas :", res.data)
     }).catch(err => {
       console.err('Something went bad', err)
     })
  }

  return (
    <Card className={classes.root}>
      {
        readOnly ? (
          <>
            <h1>{name} {id}</h1>
            <h2>{price}</h2>
          </>
        ) : (
          <form>
            <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                value={newValues.name}
                onChange={changeInputValue}
                name="name"
                id="my-input"
                aria-describedby="my-helper-text"
                />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Price</InputLabel>
              <Input
                value={newValues.price}
                onChange={changeInputValue}
                name="price"
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
          </form>
        )
      }
      <CardMedia
        className={classes.media}
        image={picture}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleChangeReadOnly}>
        {
          readOnly ? <CreateIcon /> : <CheckCircleIcon onClick={modifyInput} />
        }
        </Button>
        <DeleteIcon onClick={deleteItem} />
      </CardActions>
    </Card>
  );
}
