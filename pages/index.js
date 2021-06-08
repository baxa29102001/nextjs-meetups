import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

function MainPage(props) {
  return (
    <Fragment>
      <Head>
        <title>MeetUps</title>
        <meta name='description' content='Meetups sections' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://baxa_2910:bohodir29102001<>@test.7g6l3.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}).toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default MainPage;
