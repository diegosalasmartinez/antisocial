import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { getCategoryColors } from '../../theme/colors'

class Categories extends Component {
  render() {
    const { category } = this.props;
    const { categories } = category;

    return (
      <Box className='categories'>
        <Typography className='category-title' textAlign="left" sx={{ fontSize: 20 }}>
          Categories for you
        </Typography>
        <Box>
          <Grid container spacing={2}>
            { categories.map(c => 
              <Grid item xs={6}>
                <Card className='category' sx={{backgroundColor: getCategoryColors(c.name)}}>
                  <CardContent>
                    <Typography className='title' sx={{ fontSize: 16 }}>
                      {c.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) }
          </Grid>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ...bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
