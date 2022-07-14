import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionChannel } from "../../utils";
import { accessToken } from "../../redux/authReducer";
import SubsChannel from "../../components/subsChannel/SubsChannel";

const SubscriptionsScreen = () => {
  const { loading, channels } = useSelector((state) => state.subscriptions);
  const token = useSelector(accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionChannel(token));
  }, [token, dispatch]);

  return (
    <div>
      {!loading && channels.map((channel) => <SubsChannel item={channel} />)}
    </div>
  );
};

export default SubscriptionsScreen;
