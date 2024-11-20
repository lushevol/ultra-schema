package com.scb.ratan.rulev2.services;

import com.ratanone.shuaipoc.repository.GenericConfigRepository;
import com.ratanone.shuaipoc.services.GenericConfigService;
import com.ratanone.shuaipoc.entities.RepoGenericConfig;
import com.ratanone.shuaipoc.generated.types.AddGenericConfigInput;
import com.ratanone.shuaipoc.generated.types.GenericConfig;
import graphql.com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenericConfigServiceImpl implements GenericConfigService {

    @Autowired
    private GenericConfigRepository genericConfigRepo;
    private List<GenericConfig> genericConfigs = Lists.newArrayList();

}
