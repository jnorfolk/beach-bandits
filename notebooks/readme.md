The data was acquired from the website https://koordinates.com/layer/111589-florida-beach-names/.

The dataset was constructed by reports from several users including beaches names, their length and the county they were located.

Since the data from the users is missing and we dont really need it we dropped those columns and also dropped the column for the area since we are only interested in the beaches locations, not their size.

For the preprocessing step, we created the columns for latitude and longitude and filled those with the aid of the Open Cage API. After we combined that into a single category called coordinates to improve readability. We later spotted some misspelling in some beaches names and dropped them by hand and dropped as well the duplicates in the dataframe since either the same beach was entered several times by the users. 

By the end we save our preprocessed data into a csv to read when exploring the models, that way we wouldnt have to go to all the process several times since it takes about 4mn to preprocess the data with the API.


Conclusions:
The dataset could be further improved by adding more beaches to it. Due to poor data quality, we had to drop some cases that could have improved the model. Also, by including more variables such as beach popularity, amenities, and environmental conditions, we could provide a more detailed and useful resource for picking the next stop on our day. Future work should focus on gathering higher quality data and expanding the dataset to cover more beaches and additional relevant information.