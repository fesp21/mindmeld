function findTeamId(teamCode) {
  return Teams.findOne({code: teamCode}) && Teams.findOne({code: teamCode})._id;
}

function findProjectId(projectCode) {
  return Projects.findOne({code: projectCode}) && Projects.findOne({code: projectCode})._id;
}

function findFeatureId(featureCode) {
  return Features.findOne({code: featureCode}) && Features.findOne({code: featureCode})._id;
}

function findIssueId(issueCode) {
  return Issues.findOne({code: issueCode}) && Issues.findOne({code: issueCode})._id;
}

function setSession(session) {
  Session.set('currentTeamId', 
    session.teamCode && Teams.findOne({code: session.teamCode})._id);
  Session.set('currentProjectId',
    session.projectCode && Projects.findOne({code: session.projectCode})._id);
  Session.set('currentFeatureId',
    session.featureCode && Features.findOne({code: session.featureCode})._id);
  Session.set('currentIssueId',
    session.issueCode && Issues.findOne({code: session.issueCode})._id);
}

Meteor.Router.add({
  '/': { as: 'home', to: function() {
      setSession({});
      if (Meteor.user()) {
        return 'home';
      } else {
        return 'homePublic';
      }
    }
  },
  '/team/create':
    { as: 'createTeam', to: function() {
      setSession({});
      if (Meteor.user()) {
        return 'createTeam';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode': { as: 'team', to: function(teamCode) {
      var teamId = findTeamId(teamCode);
      if (Meteor.user() && teamId) {     
        setSession({teamCode: teamCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'team',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'team';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode/edit': { as: 'editTeam', to: function(teamCode) {
      var teamId = findTeamId(teamCode);
      if (Meteor.user() && teamId) {
        setSession({teamCode: teamCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'editTeam',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editTeam';
      } else {
        return 'notFound';
      }
    }
  },
  '/:teamCode/project/create': { as: 'createProject', to: function(teamCode) {
      var teamId = findTeamId(teamCode);
      if (Meteor.user() && teamId) {
        setSession({teamCode: teamCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'createProject',
          templatePathAttributes: {teamCode: teamCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'createProject';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode': { as: 'project', to: function(teamCode, projectCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      if (Meteor.user() && teamId && projectId) {
        setSession({teamCode: teamCode, projectCode: projectCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'project',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'project';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/edit': { as: 'editProject', to: function(teamCode, projectCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      if (Meteor.user() && teamId && projectId) {
        setSession({teamCode: teamCode, projectCode: projectCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'editProject',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editProject';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/feature/create': { as: 'createFeature', to: function(teamCode, projectCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      if (Meteor.user() && teamId && projectId) {
        setSession({teamCode: teamCode, projectCode: projectCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'createFeature',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'createFeature';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode': { as: 'feature', to: function(teamCode, projectCode, featureCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var featureId = findFeatureId(featureCode);
      if (Meteor.user() && teamId && projectId && featureId) {
        setSession({teamCode: teamCode, projectCode: projectCode, featureCode: featureCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'feature',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'feature';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/edit': { as: 'editFeature', to: function(teamCode, projectCode, featureCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var featureId = findFeatureId(featureCode);
      if (Meteor.user() && teamId && projectId && featureId) {
        setSession({teamCode: teamCode, projectCode: projectCode, featureCode: featureCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'editFeature',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editFeature';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/issue/create': { as: 'createIssue', to: function(teamCode, projectCode, featureCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var featureId = findFeatureId(featureCode);
      if (Meteor.user() && teamId && projectId && featureId) {
        setSession({teamCode: teamCode, projectCode: projectCode, featureCode: featureCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'createIssue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'createIssue';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/:issueCode': { as: 'issue', to: function(teamCode, projectCode, featureCode, issueCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var featureId = findFeatureId(featureCode);
      var issueId = findIssueId(issueCode);
      if (Meteor.user() && teamId && projectId && featureId && issueId) {
        setSession({teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'issue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'issue';
      } else {
        return 'notFound';
      }
    }    
  },
  '/:teamCode/:projectCode/:featureCode/:issueCode/edit': { as: 'editIssue', to: function(teamCode, projectCode, featureCode, issueCode) {
      var teamId = findTeamId(teamCode);
      var projectId = findProjectId(projectCode);
      var featureId = findFeatureId(featureCode);
      var issueId = findIssueId(issueCode);
      if (Meteor.user() && teamId && projectId && featureId && issueId) {
        setSession({teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode});
        var movementAttributes = {
          teamId: teamId,
          template: 'editIssue',
          templatePathAttributes: {teamCode: teamCode, projectCode: projectCode, featureCode: featureCode, issueCode: issueCode}
        };
        Meteor.call('logMovement', movementAttributes);
        return 'editIssue';
      } else {
        return 'notFound';
      }
    }    
  }
});