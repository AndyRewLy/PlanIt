def get_rsvp_status_string(rsvp_status):
    if rsvp_status is 0: 
        return "not going"
    elif rsvp_status is 1:
        return "interested"
    else:
        return "going"