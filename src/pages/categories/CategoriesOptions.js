import React, { Component } from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { getCategoryColors } from '../../theme/colors'

export default class CategoriesOptions extends Component {
  render() {
    const { categories } = this.props
    return (
      <Box className='categories'>
        <Typography className='category-title' textAlign="left" sx={{ fontSize: 20 }}>
          Categories for you
        </Typography>
        <Box>
          <Grid container spacing={2}>
            { categories.map(c => 
              <Grid item key={c._id} xs={6}>
                <Card className='category' sx={{backgroundColor: getCategoryColors(c.name)}} onClick={() => this.props.onClickCategory(c._id)}>
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
